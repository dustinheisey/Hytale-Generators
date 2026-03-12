import { assertHex, globals, syncDir, type HexColor } from "@hg";
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

export function texture(config: TextureConfig): void;
export function texture(color: string | undefined, input: string, output: string): void;
export function texture(cfgOrColor: TextureConfig | string | undefined, input?: string, output?: string): void {
  if (!cfgOrColor) return;
  const cfg: TextureConfig =
    typeof cfgOrColor === "string"
      ? { color: cfgOrColor as HexColor, inputFile: input ?? "", outputFile: output ?? "" }
      : cfgOrColor;

  assertHex(cfg.color);
  const out = `${globals().outDir}/Common/${cfg.outputFile}.png`;
  syncDir(out);

  void sharp(`assets/${cfg.inputFile}.png`)
    .tint(parseColor(cfg.color))
    .toFile(out)
    .catch((err: unknown) => {
      throw new Error(`Failed to generate texture "${cfg.outputFile}": ${err as Error}`);
    });
}
