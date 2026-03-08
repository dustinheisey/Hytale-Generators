import { global, syncFile } from "#hg/index";
import fs from "node:fs";

export interface LangConfig {
  key: string;
  value: string;
}

export function lang(entries: Record<string, string | undefined>) {
  const { outDir } = global();
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
