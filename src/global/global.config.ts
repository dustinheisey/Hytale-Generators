export interface GlobalConfig {
  modId: string;
  outDir: string;
}

let currentGlobal: GlobalConfig | null = null;

export function setGlobal(config: string): void;
export function setGlobal(config: GlobalConfig): void;
/**
 * Consumer calls this once at startup / before generating assets.
 * @param global - global config
 */
export function setGlobal(global: string | GlobalConfig) {
  currentGlobal = typeof global === "string" ? { modId: global, outDir: "dist" } : global;
}

/**
 * Internal: generators call this to access consumer-provided values.
 * Throws a clear error if consumer forgot to initialize.
 * @returns global config object
 */
export const global = (): GlobalConfig => {
  if (!currentGlobal) {
    throw new Error(`Global config not set. Call setGlobalConfig({ modId: "..." }) before running generators.`);
  }
  return currentGlobal;
};
