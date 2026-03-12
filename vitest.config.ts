import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@schemas": new URL("./src/schemas/", import.meta.url).pathname,
      "@/": new URL("./src/", import.meta.url).pathname,
      "@": new URL("./src/index", import.meta.url).pathname
    }
  },
  test: {
    environment: "node",
    setupFiles: ["./src/api/util/tests/setup.ts"]
  }
});
