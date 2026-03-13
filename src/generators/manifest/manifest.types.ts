export interface AuthorInfo {
  /** Display name of the author. Required. */
  name: string;

  /** Contact email address of the author. */
  email?: string;

  /** URL of the author's website or profile. */
  url?: string;
}

/**
 * A map of plugin identifiers to their required semver ranges.
 * Keys must be in the format `group:name`, e.g. `"org.example:myplugin": "1.0.0"`.
 */
export type DependencyInfo = Record<string, string>;

export interface ManifestCfg {
  /** Group name, e.g. the author's circle or company. Required. */
  group: string;

  /** Display name of the plugin. Required. */
  name: string;

  /** Short description of what the plugin does. */
  description?: string;

  /** Semantic version of the plugin, e.g. `1.0.0`. Required. */
  version: string;

  /** List of authors who contributed to the plugin. Required. */
  authors: AuthorInfo[];

  /** URL of the plugin's website or repository. */
  website?: string;

  /**
   * Fully qualified package path to the plugin's main class.
   * @example "org.example.ExamplePlugin"
   */
  main: string;

  /**
   * Hytale server version this plugin is compatible with.
   * @default "*"
   */
  serverVersion: string;

  /** Plugins that must be loaded before this plugin. */
  dependencies?: DependencyInfo;

  /** Plugins that will be used if present but are not required. */
  optionalDependencies?: DependencyInfo;

  /** Plugins that this plugin must be loaded before. */
  loadBefore?: DependencyInfo;

  /** Nested sub-plugins bundled within this plugin. */
  subPlugins?: ManifestCfg[];

  /**
   * Whether the plugin is disabled by default and must be explicitly enabled.
   * @default false
   */
  disabledByDefault?: boolean;

  /**
   * Whether the plugin includes an asset pack.
   * @default false
   */
  includesAssetPack?: boolean;
}
