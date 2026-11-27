const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HONEYPOT_FIELDS = new Set(["website", "company"]);
const INTERNAL_FIELDS = new Set(["website", "company", "startedAt"]);
const MAX_LENGTHS: Record<string, number> = {
  name: 120,
  email: 254,
  phone: 40,
  eventDate: 40,
  packageInterest: 160,
  message: 5000,
  source: 300,
};

const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  eventDate: "Preferred date",
  packageInterest: "Package",
  message: "Message",
  source: "Page",
};

export type ContactPayload = {
  name: string;
  email: string;
  fields: { label: string; name: string; value: string }[];
  source?: string;
};

export type ContactParseResult =
  | { ok: true; payload: ContactPayload; spam: boolean }
  | { ok: false; error: string };

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function fieldLabel(name: string) {
  return FIELD_LABELS[name] || name.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

export function parseContactSubmission(
  body: Record<string, unknown>,
  fallbackSource?: string,
): ContactParseResult {
  const honeypotTriggered = [...HONEYPOT_FIELDS].some((name) => asString(body[name]));

  const name = asString(body.name);
  const email = asString(body.email).toLowerCase();
  const message = asString(body.message);
  const source = pageSource(asString(body.source) || fallbackSource);

  if (!name || !email || !message) {
    return { ok: false, error: "Please include your name, email and message." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (name.length > MAX_LENGTHS.name || email.length > MAX_LENGTHS.email) {
    return { ok: false, error: "Please shorten the details and try again." };
  }
  if (message.length > MAX_LENGTHS.message) {
    return { ok: false, error: "Please shorten the message and try again." };
  }

  for (const [key, limit] of Object.entries(MAX_LENGTHS)) {
    if (asString(body[key]).length > limit) {
      return { ok: false, error: "Please shorten the details and try again." };
    }
  }

  const fields: ContactPayload["fields"] = [];
  const seen = new Set<string>();
  const preferredOrder = [
    "name",
    "email",
    "phone",
    "eventDate",
    "packageInterest",
    "message",
    "source",
  ];

  for (const key of preferredOrder) {
    if (INTERNAL_FIELDS.has(key)) continue;
    const value = key === "source" ? source : key === "email" ? email : asString(body[key]);
    if (!value) continue;
    fields.push({ label: fieldLabel(key), name: key, value });
    seen.add(key);
  }

  for (const [key, raw] of Object.entries(body)) {
    if (seen.has(key) || INTERNAL_FIELDS.has(key)) continue;
    const value = asString(raw);
    if (!value) continue;
    if (value.length > 2000) {
      return { ok: false, error: "Please shorten the details and try again." };
    }
    fields.push({ label: fieldLabel(key), name: key, value });
  }

  return {
    ok: true,
    spam: honeypotTriggered,
    payload: { name, email, fields, source: source || undefined },
  };
}

function pageSource(value?: string) {
  if (!value) return "";
  try {
    if (/^https?:\/\//i.test(value)) {
      return new URL(value).pathname || "/";
    }
  } catch {
    return value.slice(0, MAX_LENGTHS.source);
  }
  return value.slice(0, MAX_LENGTHS.source);
}

export function enquirySubject(name: string) {
  return `New SwingSmart website enquiry – ${name}`;
}

export function enquiryText(payload: ContactPayload, submittedAt: Date) {
  const lines = payload.fields.map((field) =>
    field.name === "message" ? `${field.label}:\n${field.value}` : `${field.label}: ${field.value}`,
  );
  lines.push(`Submitted: ${submittedAt.toISOString()}`);
  return ["New SwingSmart website enquiry", "", ...lines].join("\n");
}

export function enquiryHtml(payload: ContactPayload, submittedAt: Date) {
  const rows = payload.fields
    .map((field) => {
      const value = escapeHtml(field.value).replace(/\n/g, "<br />");
      return `<tr>
        <th align="left" style="padding:8px 12px 8px 0;color:#9a9589;font-weight:500;vertical-align:top;white-space:nowrap;">${escapeHtml(field.label)}</th>
        <td style="padding:8px 0;color:#f3f0e6;">${value}</td>
      </tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:24px;background:#070807;color:#f3f0e6;font-family:Georgia,serif;">
    <p style="margin:0 0 16px;font-size:13px;letter-spacing:0.16em;text-transform:uppercase;color:#8fbf8c;">SwingSmart UK</p>
    <h1 style="margin:0 0 20px;font-size:28px;font-weight:normal;">New website enquiry</h1>
    <table style="width:100%;border-collapse:collapse;font-size:16px;line-height:1.5;">${rows}</table>
    <p style="margin:24px 0 0;color:#9a9589;font-size:13px;">Submitted ${escapeHtml(submittedAt.toISOString())}</p>
  </body>
</html>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function recipientFromEnv() {
  const recipient = process.env.FORM_RECIPIENT_EMAIL?.trim();
  if (!recipient) return null;
  if (!EMAIL_PATTERN.test(recipient)) return null;
  return recipient;
}

export function fromAddress(recipient: string) {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  if (!configured) return `SwingSmart UK <${recipient}>`;
  if (configured.includes("<")) return configured;
  return `SwingSmart UK <${configured}>`;
}
