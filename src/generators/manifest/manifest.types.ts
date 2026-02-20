import type { Pascal } from "../../index.js";

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
