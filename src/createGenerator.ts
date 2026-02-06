import type { JsonConfig, LangConfig, TextureConfig } from "./index.js";
import { syncJson, syncLang, syncTexture } from "./index.js";

type GeneratorSteps<C extends object, D> = Partial<{
  lang: (config: C) => LangConfig[];
  json: JsonConfig<C, D>;
  texture: (config: C) => TextureConfig;
  post: (config: C) => void;
}>;

/**
 *
 * @param steps - config objects for building function
 * @returns function that builds lang, json, and or textures
 */
export function createGenerator<C extends object, D extends object>(steps: GeneratorSteps<C, D>) {
  return (c: C) => {
    if (steps.lang) syncLang(steps.lang(c));
    if (steps.json) syncJson(steps.json, c);
    if (steps.texture) syncTexture(steps.texture(c));
    if (steps.post) steps.post(c);
  };
}
