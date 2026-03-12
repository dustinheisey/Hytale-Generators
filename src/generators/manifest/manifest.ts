import { builder, json } from "#hg";
import type { ManifestCfg } from "./manifest.types.js";

export const manifest = builder((cfg: ManifestCfg) => json(`manifest`, cfg));
