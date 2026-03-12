import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: {
    resolve: true
  },
  sourcemap: true,
  tsconfig: "tsconfig.build.json",
  esbuildOptions(options) {
    options.alias = {
      "@hg": "./src/index.ts",
      "@schemas/*": "./src/schemas/*"
    };
  }
});
