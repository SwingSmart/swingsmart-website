import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { resolve } from "../src/sanity/presentation/resolve";
import { structure } from "../src/sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { apiVersion, previewOrigin } from "./src/env";

const singletonTypes = new Set(["siteSettings", "navigation"]);

export default defineConfig({
  name: "default",
  title: "SwingSmart",
  projectId: "3sbwydux",
  dataset: "production",
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
    visionTool({ defaultApiVersion: apiVersion }),
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
