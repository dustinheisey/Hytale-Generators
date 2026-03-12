import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "#hg": new URL("./src/index", import.meta.url).pathname
    }
  },
  test: {
    environment: "node",
    setupFiles: ["./src/test/setup.ts"]
  }
});
