export type PathCfg = {
  json: string;
  lang: string;
  langRoot: string;
  assets: string;
  icon: string;
};

export type GlobalsCfg = {
  modId: string;
  assetsDir: string;
  outDir: string;
  paths: {
    item: PathCfg;
    block: Pick<PathCfg, "json">;
    categories: Pick<PathCfg, "json" | "lang" | "langRoot" | "icon">;
    resourceType: Pick<PathCfg, "json" | "icon">;
    recipe: Pick<PathCfg, "json">;
    barterShop: Pick<PathCfg, "json">;
    wordList: Pick<PathCfg, "json">;
    quality: Pick<PathCfg, "json" | "lang" | "langRoot">;
  };
};

let globalsCfg: GlobalsCfg | null = null;

const globalsDefaults = {
  outDir: "dist",
  assetsDir: "./src/assets",
  paths: {
    categories: {
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
    block: {
      json: "Server/Item/Block"
    },
    recipe: {
      json: "/Server/Item/Recipes"
    },
    barterShop: {
      json: "/Server/BarterShops"
    },
    wordList: {
      json: "/Server/WordLists"
    },
    quality: {
      json: "/Server/Item/Qualities",
      lang: "server.general.qualities",
      langRoot: "general.qualities"
    }
  } as const
} satisfies Partial<GlobalsCfg>;

export function setGlobals(globals: { modId: string } & Partial<GlobalsCfg>): void {
  globalsCfg = {
    ...globalsDefaults,
    ...globals,
    paths: { ...globalsDefaults.paths, ...globals.paths }
  };
}

export function globals(): GlobalsCfg {
  if (!globalsCfg) {
    throw new Error(
      `Globals config not set. Call setGlobals({ modId: "...", outDir: "..." }) before running generators.`
    );
  }
  return globalsCfg;
}
