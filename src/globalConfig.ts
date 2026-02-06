export interface GlobalConfig {
  ModId: string;
  MaxStack: number;
  TimeSeconds: number;
}

let currentGlobal: GlobalConfig | null = null;

/**
 * Consumer calls this once at startup / before generating assets.
 * @param global - global config
 */
export function setGlobal(global: GlobalConfig) {
  currentGlobal = global;
}

/**
 * Internal: generators call this to access consumer-provided values.
 * Throws a clear error if consumer forgot to initialize.
 * @returns global config object
 */
export const global = (): GlobalConfig => {
  if (!currentGlobal) {
    throw new Error(`Global config not set. Call setGlobalConfig({ ModId: "..." }) before running generators.`);
  }
  return currentGlobal;
};
