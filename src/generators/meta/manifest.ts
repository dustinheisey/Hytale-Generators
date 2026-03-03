import { builder, json } from "../../index.js";

type ManifestCfg = {
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
  serverVersion: string;
  dependencies?: object;
  optionalDependencies?: object;
  disabledByDefault?: boolean;
  loadBefore?: object;
  subPlugins?: [];
};

export const manifest = builder({
  build: (cfg: ManifestCfg) => {
    json(`manifest`, cfg);
  }
});
