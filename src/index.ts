import { generateRecipe } from "./recipe/recipe.ts";
import { syncJson, syncPublic } from "./util/sync/sync.ts";
import {
  generateCategories,
  generateDust,
  generateGem,
  generateIngot,
  generateOre,
  generateOreBlock,
  generateResourceType,
} from "./generators.ts";

/*
  - [x] Step 1: Copy public folder
  - [x] Step 2: Append lang correctly
  - [x] Step 3: Generate textures correctly
  - [x] Step 4: add creative tab json
  - [x] Step 5: add resource type json
  - [x] Step 6: add recipe json
  - [ ] Step 7: Generate oreBlock json correctly
  - [ ] Step 8: Generate ore json correctly
  - [ ] Step 9: Generate gem json correctly
  - [ ] Step 10: Generate dust json correctly
  - [ ] Step 11: Generate ingot json correctly
*/

// * Works
syncPublic();

syncJson("manifest", {
  Group: "gg.inconvenient",
  Name: "Unified Materials",
  Version: "0.2.0",
  Description: "A description of what this plugin does",
  Authors: [
    {
      Name: "Inconvenient Dev",
      Url: "https://inconvenient.gg",
    },
  ],
  Website: "https://www.curseforge.com/hytale/mods/unified-materials",
  Dependencies: {},
  OptionalDependencies: {},
  LoadBefore: {},
  DisabledByDefault: false,
  IncludesAssetPack: false,
  SubPlugins: [],
});

generateCategories({
  id: "unified_materials",
  name: "Unified Materials",
  children: [
    "ores",
    "gems",
    "dusts",
    "ingots",
    "alloys",
  ],
});

["dusts", "alloys"].forEach((type) => generateResourceType(type));

// ! Testing
const test: ElementConfig[] = [
  { id: "gold", color: "#222111" },
  { id: "tin", color: "#752718", ores: { name: "Cassiterite" } },
  {
    id: "copper",
    color: "#33aa32",
    ores: { name: "Malachite", description: "Can be processed into copper" },
  },
];

test.forEach((element) => {
  const { dust, gem, ingot, ores, ore, oreBlock } = element;

  generateDust({ ...element, ...dust });
  generateGem({ ...element, ...gem });
  generateIngot({ ...element, ...ingot });
  generateOre({ ...element, ...ores, ...ore });
  generateOreBlock("stone", { ...element, ...ores, ...oreBlock });
  generateOreBlock("basalt", { ...element, ...ores, ...oreBlock });
  generateOreBlock("sandstone", { ...element, ...ores, ...oreBlock });
  generateOreBlock("shale", { ...element, ...ores, ...oreBlock });
  generateOreBlock("slate", { ...element, ...ores, ...oreBlock });
  generateOreBlock("volcanic", { ...element, ...ores, ...oreBlock });
});
