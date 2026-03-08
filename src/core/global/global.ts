import type { HasId, HasType } from "#hg/index";

export type PathCfg = {
  json: string;
  lang: string;
  langRoot: string;
  assets: string;
  icon: string;
};

export type GlobalCfg = {
  modId: string;
  assetsDir: string;
  outDir: string;
  paths: {
    item: PathCfg;
    category: Pick<PathCfg, "json" | "lang" | "langRoot" | "icon">;
    resourceType: Pick<PathCfg, "json" | "icon">;
    recipe: Pick<PathCfg, "json">;
  };
};

export type CfgType = keyof GlobalCfg["paths"];

export type HasGroup = { group?: string };

let globalCfg: GlobalCfg | null = null;

const globalDefaults = {
  outDir: "dist",
  assetsDir: "./src/assets",
  paths: {
    category: {
      json: "Server/Item/Category/CreativeLibrary",
      icon: "Icons/ItemCategories",
      lang: "server.ui",
      langRoot: "ui"
    },
    resourceType: {
      json: "Server/Item/ResourceTypes",
      icon: "Icons/ResourceTypes"
    },
    item: {
      json: "Server/Item/Items",
      lang: "server.items",
      langRoot: "items",
      assets: "Items/",
      icon: "Icons/ItemsGenerated"
    },
    recipe: {
      json: "/Server/Item/Recipes"
    }
  }
} as const satisfies Partial<GlobalCfg>;

export function setGlobal(global: { modId: string } & Partial<GlobalCfg>): void {
  globalCfg = { ...globalDefaults, ...global } satisfies GlobalCfg;
}

export function global(): GlobalCfg {
  if (!globalCfg) {
    throw new Error(
      `Global config not set. Call setGlobal({ modId: "...", outDir: "..." }) before running generators.`
    );
  }
  return globalCfg;
}

export function resolvePath(cfg: HasType & HasGroup & HasId, g: GlobalCfg): string {
  const base = g.paths[cfg.type].json;
  return cfg.group ? `${base}/${cfg.group}/${cfg.id}` : `${base}/${cfg.id}`;
}
