import sharp from "sharp";
import { syncDir } from "@sync";

type RGB = { r: number; g: number; b: number };

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

export async function syncTexture(
  config: { color: string; inputFile: string; outputFile: string },
) {
  syncDir(config.outputFile);

  try {
    await sharp(config.inputFile)
      .tint(parseColor(config.color))
      .toFile(config.outputFile);
  } catch (err) {
    console.error("Error generating texture:", err);
  }
}