import { builder, json } from "@";
import type { ManifestCfg } from "./manifest.types";

export const manifest = builder((cfg: ManifestCfg) => json(`manifest`, cfg));
