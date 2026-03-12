export type ManifestCfg = {
  main: string;
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
