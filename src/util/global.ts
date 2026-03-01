export interface GlobalCfg {
  modId: string;
  outDir: string;
}

let currentGlobal: GlobalCfg | null = null;

export function setGlobal(config: string | GlobalCfg): void;
export function setGlobal(global: string | GlobalCfg): void {
  currentGlobal = typeof global === "string" ? { modId: global, outDir: "dist" } : global;
}

export function patchGlobal(patch: Partial<GlobalCfg>): void {
  currentGlobal = { ...(currentGlobal as GlobalCfg), ...patch };
}

export function global(): GlobalCfg {
  if (!currentGlobal) {
    throw new Error(
      `Global config not set. Call setGlobal({ modId: "...", outDir: "..." }) before running generators.`
    );
  }
  return currentGlobal;
}
