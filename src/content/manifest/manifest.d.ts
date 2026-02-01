declare interface ManifestConfig {
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

declare interface ManifestData {
  Group: string;
  Name: string;
  Version: string;
  Description: string;
  Authors: {
    Name: string;
    Email?: string;
    Url?: string;
  }[];
  Website: string;
  ServerVersion: string;
  Dependencies: object;
  OptionalDependencies: object;
  DisabledByDefault: boolean;
  LoadBefore?: object;
  SubPlugins?: [];
}
