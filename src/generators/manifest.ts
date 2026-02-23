import type { Pascal } from "../index.js";
import { global, syncJson, toPascal } from "../index.js";

export interface ManifestConfig {
  group: string;
  name: string;
  version: string;
  description: string;
  authors: {
    name: string;
    email?: string;
    url?: string;
  }[];
  website: string;
  serverVersion?: string;
  dependencies?: object;
  optionalDependencies?: object;
  disabledByDefault?: boolean;
  loadBefore?: object;
  subPlugins?: [];
}

export type ManifestData = Pascal<ManifestConfig>;

export function manifest(config: ManifestConfig) {
  syncJson<ManifestData>(`${global().outDir}/manifest`, toPascal(config));
}
