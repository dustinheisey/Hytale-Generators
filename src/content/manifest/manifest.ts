import { syncJson } from "@sync";

const data = (config: ManifestConfig): ManifestData => {
  const {
    group,
    name,
    version,
    description,
    authors,
    website,
    serverVersion,
    dependencies,
    optionalDependencies,
    disabledByDefault,
    loadBefore,
    subPlugins,
  } = config;

  return {
    Group: group,
    Name: name,
    Version: version,
    Description: description,
    Authors: authors.map((author) => ({
      Name: author.name,
      Email: author.email,
      Url: author.url,
    })),
    Website: website,
    ServerVersion: serverVersion || "*",
    Dependencies: dependencies || {},
    OptionalDependencies: optionalDependencies || {},
    DisabledByDefault: disabledByDefault || false,
    LoadBefore: loadBefore || {},
    SubPlugins: subPlugins || [],
  };
};

export function generateManifest(config: ManifestConfig) {
  syncJson(`manifest`, data(config));
}
