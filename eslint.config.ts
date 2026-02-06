import prettier from "eslint-config-prettier/flat";
import jsdoc from "eslint-plugin-jsdoc";

import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      jsdoc.configs["flat/recommended-typescript"]
    ],
    languageOptions: {
      parserOptions: {
        projectService: true
      }
    }
  },
  prettier
);
