import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./src/env";

const studioRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(studioRoot, "..");

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  // Hostname only. Never a full URL and never --external — those make
  // Sanity treat *.sanity.studio as an external site and fail with
  // "sanity.studio domains must be created as internal".
  studioHost: "swingsmart",
  deployment: {
    autoUpdates: true,
  },
  vite: (config) => {
    const existingAllow = config.server?.fs?.allow;
    const existingDedupe = config.resolve?.dedupe ?? [];
    return {
      ...config,
      resolve: {
        ...config.resolve,
        dedupe: [
          ...existingDedupe,
          "react",
          "react-dom",
          "sanity",
          "styled-components",
          "@sanity/icons",
        ],
      },
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
