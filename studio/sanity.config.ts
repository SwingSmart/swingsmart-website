import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { resolve } from "../src/sanity/presentation/resolve";
import { schemaTypes } from "../src/sanity/schemaTypes";
import { structure } from "../src/sanity/structure";
import { apiVersion, dataset, previewOrigin, projectId } from "./src/env";

const singletonTypes = new Set(["siteSettings", "navigation"]);

export default defineConfig({
  name: "swingsmart",
  title: "SwingSmart UK",
  projectId,
  dataset,
  plugins: [
    structureTool({
      title: "Content",
      structure,
    }),
    presentationTool({
      title: "Website preview",
      resolve,
      previewUrl: {
        initial: previewOrigin,
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
          !singletonTypes.has(template.schemaType) &&
          template.schemaType !== "enquiry",
      ),
  },
  document: {
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter(
            ({ action }) => action !== "delete" && action !== "duplicate",
          )
        : actions,
  },
});
