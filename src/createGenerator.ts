import { syncFile, syncJson, syncTexture } from "hytale-generators";
import process from "node:process";
import fs from "node:fs";

type LangKV = { key: string; value: string };

type LangPatch = Record<string, LangKV>;

interface LangEntry {
  key: string;
  value: string;
}

type OneOrMany<T> = T | T[];

type LangOutput =
  | OneOrMany<LangPatch>
  | LangEntry[]
  | OneOrMany<LangPatch | LangEntry[]>;

type LangStep<C> = (config: C) => LangOutput;

interface JsonStep<C, D> {
  path: string | ((config: C) => string);
  data: (config: C) => D;
}

interface TextureConfig {
  color: string;
  inputFile: string;
  outputFile: string;
}

type GeneratorSteps<C extends object, D> = Partial<{
  lang: (config: C) => LangEntry[];
  json: JsonStep<C, D>;
  texture: (config: C) => TextureConfig;
  post: (config: C) => void;
}>;

export function updateServerLang(entries: LangKV[]) {
  const file = `${process.cwd()}/dist/Server/Languages/en-US/server.lang`;

  syncFile(file);

  const raw = fs.readFileSync(file, "utf8");
  const lines = raw.length ? raw.split(/\r?\n/) : [];

  // Keep last value for duplicates in `entries` (later wins)
  const updates = new Map<string, string>();
  for (const { key, value } of entries) {
    updates.set(key, value ?? "");
  }

  const seen = new Set<string>();

  const outLines = lines.map((line) => {
    // Parse "key=value" (split on first '=' only)
    const eq = line.indexOf("=");
    if (eq === -1) return line;

    const key = line.slice(0, eq).trim();
    if (!key) return line;

    if (updates.has(key)) {
      seen.add(key);
      // Write normalized: key=value (preserve key as parsed; you can preserve original spacing if you want)
      return `${key}=${updates.get(key)}`;
    }
    return line;
  });

  // Append missing keys
  for (const [key, value] of updates.entries()) {
    if (!seen.has(key)) outLines.push(`${key}=${value}`);
  }

  // Avoid trailing extra newline explosion; keep file ending with \n for POSIX sanity
  const finalText =
    outLines.filter((_, i) =>
      !(i === outLines.length - 1 && outLines[i] === "")
    ).join("\n") + "\n";

  // Write atomically
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, finalText, "utf8");
  fs.renameSync(tmp, file);
}

function generateJson<C, D extends object>(step: JsonStep<C, D>, config: C) {
  const outPath = typeof step.path === "function"
    ? step.path(config)
    : step.path;
  syncJson(outPath, step.data(config));
}

function generateTextures(c: TextureConfig) {
  syncTexture({
    color: c.color,
    inputFile: c.inputFile,
    outputFile: c.outputFile,
  });
}

export function createGenerator<C extends object, D extends object>(
  steps: GeneratorSteps<C, D>,
) {
  return (c: C) => {
    if (steps.lang) updateServerLang(steps.lang(c));
    if (steps.json) generateJson(steps.json, c);
    if (steps.texture) generateTextures(steps.texture(c));
    steps.post?.(c);
  };
}
