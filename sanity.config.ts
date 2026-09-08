import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { resolve } from "./src/sanity/presentation/resolve";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const singletonTypes = new Set(["siteSettings", "navigation"]);

export default defineConfig({
  name: "swingsmart",
  title: "SwingSmart UK",
  projectId: projectId || "placeholder",
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      title: "Content",
      structure,
    }),
    presentationTool({
      title: "Website preview",
      resolve,
      previewUrl: {
        initial: "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    ...(process.env.SANITY_STUDIO_SHOW_VISION === "true"
      ? [visionTool({ defaultApiVersion: apiVersion, title: "Developer tools" })]
      : []),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        (template) =>
          !singletonTypes.has(template.schemaType) && template.schemaType !== "enquiry",
      ),
  },
  document: {
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter(({ action }) => action !== "delete" && action !== "duplicate")
        : actions,
  },
});
