import { globals, syncFile } from "@";
import * as fs from "node:fs";

export type LangFile = "server" | "wordlists";

export interface LangOptions {
  /** The lang file to write to. Defaults to `"server"`. */
  langFile?: LangFile;
}

export function lang(entries: Record<string, string | undefined>, options?: LangOptions): void;
export function lang(langKey: string, name?: string, description?: string, options?: LangOptions): void;
export function lang(
  entriesOrKey: Record<string, string | undefined> | string,
  nameOrOptions?: string | LangOptions,
  description?: string,
  options?: LangOptions
): void {
  const isKeyForm = typeof entriesOrKey === "string";
  const resolvedOptions: LangOptions = isKeyForm ? (options ?? {}) : ((nameOrOptions as LangOptions | undefined) ?? {});
  const langFile = resolvedOptions.langFile ?? "server";
  const isWordlist = langFile === "wordlists";

  const entries: Record<string, string | undefined> = isKeyForm
    ? {
        [isWordlist ? entriesOrKey : `${entriesOrKey}.name`]: nameOrOptions as string | undefined,
        ...(isWordlist ? {} : { [`${entriesOrKey}.description`]: description })
      }
    : entriesOrKey;

  const { outDir } = globals();
  const file = `${outDir}/Server/Languages/en-US/${langFile}.lang`;
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
