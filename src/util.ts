import * as fs from "node:fs";
import * as path from "node:path";

export function generate(file: string, config: object) {
  const dir = path.dirname(`dist/${file}.json`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFile(`dist/${file}.json`, JSON.stringify(config), (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log(`${file}.json written successfully`);
  });
}

export function updateServerLang(id: string) {
  const serverLangPath = 'dist/server.lang';
  
  // Ensure the file exists
  if (!fs.existsSync(serverLangPath)) {
    fs.writeFileSync(serverLangPath, '');
  }
  
  // Append new line to server.lang
  const newLine = `${id}.name=server.items.${id}.name\n`;
  fs.appendFileSync(serverLangPath, newLine);
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
