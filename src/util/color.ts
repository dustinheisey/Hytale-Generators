import { clampChroma, converter, formatHex } from "culori";

export type HexColor = `#${string}`;

export type EffectColors = {
  light: HexColor;
  interact: HexColor;
  sparks: HexColor;
};

const toOklch = converter("oklch");

type Preset = {
  // L' = L + lift * (1 - L)   (lift toward white)
  lift: number;
  // C' = C * cScale
  cScale: number;
  // h' = h + hShift (degrees)
  hShift: number;
};

const PRESETS: Record<keyof EffectColors, Preset> = {
  light: { lift: 0.33, cScale: 0.60, hShift: 13 },
  interact: { lift: 0.23, cScale: 1.03, hShift: 12 },
  sparks: { lift: 0.44, cScale: 0.83, hShift: 20 },
};

function assertHex(input: string): asserts input is HexColor {
  if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(input)) {
    throw new Error(`Invalid hex: ${input}`);
  }
}

function derive(baseHex: HexColor, p: Preset): HexColor {
  const base = toOklch(baseHex) as {
    l: number;
    c: number;
    h?: number;
    alpha?: number;
  } | undefined;
  if (!base) throw new Error(`Could not parse: ${baseHex}`);

  const h0 = base.h ?? 0;

  const color = {
    mode: "oklch" as const,
    l: Math.max(0, Math.min(1, base.l + p.lift * (1 - base.l))),
    c: Math.max(0, base.c * p.cScale),
    h: (h0 + p.hShift + 360) % 360,
    alpha: base.alpha ?? 1,
  };

  // Gamut-map back into sRGB so we can output hex
  return formatHex(clampChroma(color, "oklch", "rgb"))
    .toUpperCase() as HexColor;
}

export function deriveEffectColors(baseHex: string): EffectColors {
  assertHex(baseHex);
  const hex = baseHex as HexColor;

  return {
    light: derive(hex, PRESETS.light),
    interact: derive(hex, PRESETS.interact),
    sparks: derive(hex, PRESETS.sparks),
  };
}
