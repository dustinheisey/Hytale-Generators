import * as fs from "node:fs";
import * as path from "node:path";

export function generate(
  config: {
    file: string;
    lang: { name: string; description?: string };
    name: string;
    description?: string | null;
    options: object;
  },
) {
  const { file, lang, name, description, options } = config;
  const dir = path.dirname(`dist/json/${file}.json`);
  const langPath = "dist/server.lang";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFile(
    `dist/${file}.json`,
    JSON.stringify(options),
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log(`${config.file}.json written successfully`);
    },
  );
  if (!fs.existsSync(langPath)) fs.writeFileSync(langPath, "");
  fs.appendFileSync(langPath, `${lang.name}=${name}\n`);
  if (description) {
    fs.appendFileSync(langPath, `${lang.description}=${description}\n`);
  }
}

export function shouldInclude(
  filter: Filter,
  config?: Config,
): boolean {
  if (config) {
    if (config.include && config.include?.includes(filter)) return true;
    if (config.exclude && !config.exclude?.includes(filter)) return true;
    if (!config.include && !config.exclude) return true;
    return false;
  }
  return true;
}

export function uppercase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
