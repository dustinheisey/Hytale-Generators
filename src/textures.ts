import sharp from "sharp";

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

/**
 * maskPath: grayscale PNG (optionally with alpha)
 * color: tint color
 * outPath: where to write the generated PNG
 *
 * Rule: outputRGB = tintRGB * maskLuma
 * Alpha: if the mask has alpha, it’s preserved; otherwise fully opaque.
 */
export async function generateTintedTextureFromMask(opts: {
  maskPath: string;
  color: string;
  outPath: string;
}) {
  const { maskPath, outPath, color } = opts;
  const { r, g, b } = parseColor(color);

  // Load mask, ensure it has alpha so output can be RGBA.
  // ensureAlpha docs: https://sharp.pixelplumbing.com/api-channel/
  const mask = sharp(maskPath).ensureAlpha();

  const meta = await mask.metadata();
  if (!meta.width || !meta.height) {
    throw new Error("Could not read mask dimensions");
  }

  // Make a solid color base image the same size as the mask.
  const base = sharp({
    create: {
      width: meta.width,
      height: meta.height,
      channels: 4,
      background: { r, g, b, alpha: 1 },
    },
  });

  // Prepare an RGB “luminance image” from the mask to multiply into the base.
  // composite/blend docs: https://sharp.pixelplumbing.com/api-composite/
  const maskRgb = await sharp(maskPath)
    .ensureAlpha()
    .removeAlpha()
    .grayscale() // convert to grayscale luminance
    .toColorspace("srgb")
    .toBuffer();

  // Multiply base color by mask luminance.
  // This makes dark parts darker, bright parts keep the tint.
  const colored = base.composite([{ input: maskRgb, blend: "multiply" }]);

  // Preserve mask alpha (if any) by extracting mask alpha and joining it as the output alpha channel.
  // (extractChannel('alpha') exists; see related API discussions/issues)
  // https://github.com/lovell/sharp/issues/2138
  const alpha = await mask.extractChannel("alpha").toColourspace("b-w")
    .toBuffer();

  await colored
    .removeAlpha()
    .joinChannel(alpha) // attach alpha as the 4th channel
    .png()
    .toFile(outPath); // https://sharp.pixelplumbing.com/api-output/
}
