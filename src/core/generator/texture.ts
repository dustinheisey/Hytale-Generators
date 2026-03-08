import { assertHex, global, type HexColor, syncDir } from "#hg/index";
import sharp from "sharp";

type RGB = { r: number; g: number; b: number };

export interface TextureConfig {
  color: HexColor;
  inputFile: string;
  outputFile: string;
}

function parseColor(color: HexColor): RGB {
  const h = color.slice(1);
  const expanded = h.length === 3 ? h.replace(/./g, c => c + c) : h;
  return {
    r: parseInt(expanded.slice(0, 2), 16),
    g: parseInt(expanded.slice(2, 4), 16),
    b: parseInt(expanded.slice(4, 6), 16)
  };
}

export function texture(color: string, input: string, output: string) {
  assertHex(color);
  const out = `${global().outDir}/Common/${output}.png`;
  syncDir(out);
  sharp(`assets/${input}.png`)
    .tint(parseColor(color))
    .toFile(out)
    .catch((err: unknown) => {
      throw new Error(`Failed to generate texture "${output}": ${err as Error}`);
    });
}
