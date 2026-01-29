import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

type RGB = { r: number; g: number; b: number };

function parseColor(color: string): RGB {
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
