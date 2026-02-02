export { generateCategories } from "./categories/categories.ts";
export { generateRecipe } from "./recipe/recipe.ts";
export {
  generateResourceType,
  generateResourceTypes,
} from "./resource-type/resource-type.ts";
export { generateManifest } from "./manifest/manifest.ts";

export const manifest: ManifestConfig = {
  group: "gg.inconvenient",
  name: "Unified Materials",
  version: "0.2.0",
  description: "Lots of materials for use in other mods",
  authors: [
    {
      name: "Inconvenient Dev",
      url: "https://inconvenient.gg",
    },
  ],
  website: "https://www.curseforge.com/hytale/mods/unified-materials",
};

export const categories: CategoriesConfig = {
  id: "unified_materials",
  name: "Unified Materials",
  children: [
    "ores",
    "gems",
    "dusts",
    "ingots",
    { id: "alloys", icon: "ingots" },
  ],
};

export const resourceTypes: ResourceTypeConfig[] = [
  { id: "dusts", icon: "rock" },
  { id: "alloys", icon: "rock" },
];
