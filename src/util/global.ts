interface HasLang {
  json: string;
  icon: string;
  lang: string;
  langRoot: string;
}

export interface GlobalCfg {
  modId: string;
  outDir: string;
  categories: HasLang;
  resourceTypes: { json: string; icon: string };
  items: HasLang & ({ assets: string } | { model: string; texture: string });
  recipes: { json: string };
  [key: string]: unknown;
}

let globalCfg: GlobalCfg | null = null;

const globalDefaults = {
  outDir: "dist",
  categories: {
    json: "Server/Item/Category/CreativeLibrary",
    icon: "Icons/ItemCategories",
    lang: "server.ui",
    langRoot: "ui"
  },
  resourceTypes: {
    json: "Server/Item/ResourceTypes",
    icon: "Icons/ResourceTypes"
  },
  items: {
    json: "Server/Item/Items",
    lang: "server.items",
    langRoot: "items",
    assets: "Items/",
    icon: "Icons/ItemsGenerated"
  },
  recipes: {
    json: "/Server/Item/Recipes"
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
