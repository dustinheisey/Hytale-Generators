import { clampChroma, converter, formatHex } from "culori";

export type HexColor = `#${string}`;

export type EffectColors = {
  light: HexColor;
  interact: HexColor;
  sparks: HexColor;
};

const toOklch = converter("oklch");

type ColorConfig = {
  lift: number;
  cScale: number;
  hShift: number;
};

/**
 *
 * @param hex - hex code string
 */
function assertHex(hex: string): asserts hex is HexColor {
  if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex)) {
    throw new Error(`Invalid hex: ${hex}`);
  }
}

/**
 *
 * @param baseHex - hex code
 * @param config - color adjustments config
 * @returns derived hex code
 */
function derive(baseHex: HexColor, config: ColorConfig): HexColor {
  const base = toOklch(baseHex) as
    | {
        l: number;
        c: number;
        h?: number;
        alpha?: number;
      }
    | undefined;
  if (!base) throw new Error(`Could not parse: ${baseHex}`);

  const h0 = base.h ?? 0;

  const color = {
    mode: "oklch" as const,
    l: Math.max(0, Math.min(1, base.l + config.lift * (1 - base.l))),
    c: Math.max(0, base.c * config.cScale),
    h: (h0 + config.hShift + 360) % 360,
    alpha: base.alpha ?? 1
  };

  // Gamut-map back into sRGB so we can output hex
  return formatHex(clampChroma(color, "oklch", "rgb")).toUpperCase() as HexColor;
}

/**
 *
 * @param baseHex - hex code string
 * @returns derived light, interact and sparks hex codes
 */
export function deriveEffectColors(baseHex: string): EffectColors {
  assertHex(baseHex);
  const hex = baseHex;

  return {
    light: derive(hex, { lift: 0.33, cScale: 0.6, hShift: 13 }),
    interact: derive(hex, { lift: 0.23, cScale: 1.03, hShift: 12 }),
    sparks: derive(hex, { lift: 0.44, cScale: 0.83, hShift: 20 })
  };
}
