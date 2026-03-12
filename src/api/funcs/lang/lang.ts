import { globals, syncFile } from "#hg";
import fs from "node:fs";

export interface LangConfig {
  key: string;
  value: string;
}

export function lang(entries: Record<string, string | undefined>): void;
export function lang(langKey: string, name?: string, description?: string): void;
export function lang(
  entriesOrKey: Record<string, string | undefined> | string,
  name?: string,
  description?: string
): void {
  const entries: Record<string, string | undefined> =
    typeof entriesOrKey === "string"
      ? {
          [`${entriesOrKey}.name`]: name,
          [`${entriesOrKey}.description`]: description
        }
      : entriesOrKey;

  const { outDir } = globals();
  const file = `${outDir}/Server/Languages/en-US/server.lang`;
  syncFile(file);

  const updates = new Map(Object.entries(entries).filter((e): e is [string, string] => e[1] !== undefined));
  const existing = fs.readFileSync(file, "utf8");

  const lines = existing
    .split(/\r?\n/)
    .filter(Boolean)
    .map(line => {
      const eq = line.indexOf("=");
      if (eq === -1) return line;
      const key = line.slice(0, eq).trim();
      const next = updates.get(key);
      if (next !== undefined) {
        updates.delete(key);
        return `${key}=${next}`;
      }
      return line;
    });

  for (const [key, value] of updates) lines.push(`${key}=${value}`);

  fs.writeFileSync(file, lines.join("\n"), "utf8");
}
