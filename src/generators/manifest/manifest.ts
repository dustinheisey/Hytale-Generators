import { syncJson, toPascal } from "../../index.js";
import type { ManifestConfig, ManifestData } from "./manifest.types.js";

export function manifest(config: ManifestConfig) {
  syncJson<ManifestData>(`manifest`, toPascal(config));
}
