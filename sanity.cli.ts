import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    appId: "yjj3dnvy5scj3zfwbx70ut20",
  },
});
