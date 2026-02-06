import type { Configuration } from "lint-staged";

export default {
  "*.{js,ts,json}": "cspell --no-must-find-files",
  "**/*": "npm run format",
  "**/*.ts": "npm run lint:js"
} satisfies Configuration;
