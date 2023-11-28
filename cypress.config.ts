import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    experimentalStudio: true,
    watchForFileChanges: false,
  },
  env: {
    BASE_URL: "https://omnicrstl-sandbox.web.app",
  },
});
