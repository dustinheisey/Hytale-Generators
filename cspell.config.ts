import { defineConfig } from "cspell";

export default defineConfig({
  version: "0.2",
  dictionaryDefinitions: [{ name: "dictionary", path: "./dictionary.txt", addWords: true }],
  dictionaries: ["dictionary"],
  ignorePaths: ["package.json", "package-lock.json", ".vscode/**", "dist/**"],
  useGitignore: true
});
