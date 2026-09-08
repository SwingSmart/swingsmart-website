import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(filename) {
  const path = resolve(process.cwd(), filename);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3sbwydux";
const authToken = process.env.SANITY_AUTH_TOKEN;
const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

if (!authToken) {
  console.error(`Missing SANITY_AUTH_TOKEN.

Create a personal token (not a project robot token) at:
https://www.sanity.io/manage/personal/tokens

Then either:
  SANITY_AUTH_TOKEN=sk... node scripts/setup-sanity.mjs
or add CORS by hand:
  https://www.sanity.io/manage/project/${projectId}/api
  Add ${origin} with “Allow credentials”.
`);
  process.exit(1);
}

async function sanityFetch(path, init = {}) {
  const response = await fetch(`https://api.sanity.io/v2021-06-07${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const text = await response.text();
  let body = text;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  if (!response.ok) {
    throw new Error(`${response.status} ${path}: ${typeof body === "string" ? body : JSON.stringify(body)}`);
  }
  return body;
}

const cors = await sanityFetch(`/projects/${projectId}/cors`);
const already = (Array.isArray(cors) ? cors : []).some(
  (item) => item.origin === origin || item.origin === `${origin}/`,
);

if (already) {
  console.log(`CORS already allows ${origin}`);
} else {
  await sanityFetch(`/projects/${projectId}/cors`, {
    method: "POST",
    body: JSON.stringify({ origin, allowCredentials: true }),
  });
  console.log(`Added CORS origin ${origin} (credentials allowed)`);
}

function upsertEnv(key, value) {
  const path = resolve(process.cwd(), ".env.local");
  let source = existsSync(path) ? readFileSync(path, "utf8") : "";
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, "m");
  source = pattern.test(source) ? source.replace(pattern, line) : `${source.trim()}\n${line}\n`;
  writeFileSync(path, source.endsWith("\n") ? source : `${source}\n`);
}

async function ensureToken(label, role, envKey) {
  if (process.env[envKey]) {
    console.log(`${envKey} already set`);
    return;
  }
  const created = await sanityFetch(`/projects/${projectId}/tokens`, {
    method: "POST",
    body: JSON.stringify({ label, roleName: role }),
  });
  const token = created?.key || created?.token || created?.id;
  if (!token || typeof token !== "string" || token.length < 10) {
    throw new Error(`Could not read ${role} token from Sanity response: ${JSON.stringify(created)}`);
  }
  upsertEnv(envKey, token);
  process.env[envKey] = token;
  console.log(`Created ${role} token and wrote ${envKey} to .env.local`);
}

await ensureToken("SwingSmart website preview", "viewer", "SANITY_API_READ_TOKEN");
await ensureToken("SwingSmart website editor", "editor", "SANITY_API_WRITE_TOKEN");

console.log("Sanity project setup complete. Restart the Next.js server, then run npm run seed.");
