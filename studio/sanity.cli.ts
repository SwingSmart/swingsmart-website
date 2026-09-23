import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineCliConfig } from "sanity/cli";
import { dataset, projectId, studioHost } from "./src/env";

const studioRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(studioRoot, "..");

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost,
  autoUpdates: true,
  vite: (config) => {
    const existingAllow = config.server?.fs?.allow;
    return {
      ...config,
      server: {
        ...config.server,
        fs: {
          ...config.server?.fs,
          allow: [
            ...(Array.isArray(existingAllow) ? existingAllow : []),
            repoRoot,
          ],
        },
      },
    };
  },
});
