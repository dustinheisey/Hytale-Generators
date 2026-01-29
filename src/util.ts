import * as fs from "node:fs";
import * as path from "node:path";
import sharp from "sharp";

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
  const filePath = `dist/Server/Item/Items/Kits/${file}.json`;
  const dir = path.dirname(filePath);
  const langPath = "dist/Server/Languages/en-US/server.lang";
  const langDir = path.dirname(langPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });
  fs.writeFile(
    filePath,
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

export function parseColor(color: string): RGB {
  const hex = color.trim();
  if (!hex.startsWith("#")) {
    throw new Error(`Expected hex like "#RRGGBB", got: ${color}`);
  }
  const h = hex.slice(1);
  if (h.length === 3) {
    return {
      r: parseInt(h[0] + h[0], 16),
      g: parseInt(h[1] + h[1], 16),
      b: parseInt(h[2] + h[2], 16),
    };
  }
  if (h.length === 6) {
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    };
  }
  throw new Error(`Unsupported hex format: ${color}`);
}

export async function generateTintedTextureFromMask(opts: {
  texturePath: string;
  color: string;
  outPath: string;
}) {
  const { texturePath, color, outPath } = opts;

  // Create the directory if it does not exist
  const outDir = path.dirname(outPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  try {
    await sharp(texturePath)
      .tint(parseColor(color)) // Applies the color variant
      .toFile(outPath);
    console.log(
      `Variant saved to ${outPath} with color: ${color} & rgb ${
        parseColor(color)
      }`,
    );
  } catch (err) {
    console.error("Error generating texture:", err);
  }
}
