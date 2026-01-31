import { syncJson, syncPublic } from "./util/sync/sync.ts";
import { generateCategories } from "./content/categories/categories.ts";
import { generateResourceType } from "./content/resource-type/resource-type.ts";
import { generateOreBlock } from "./content/ore-block/ore-block.ts";
import { generateOre } from "./content/ore/ore.ts";
import { generateGem } from "./content/gem/gem.ts";
import { generateDust } from "./content/dust/dust.ts";
import { generateIngot } from "./content/ingot/ingot.ts";

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
  generateOreBlock({ ...element, ...ores, ...oreBlock, type: "stone" });
  generateOreBlock({ ...element, ...ores, ...oreBlock, type: "basalt" });
  generateOreBlock({ ...element, ...ores, ...oreBlock, type: "sandstone" });
  generateOreBlock({ ...element, ...ores, ...oreBlock, type: "shale" });
  generateOreBlock({ ...element, ...ores, ...oreBlock, type: "slate" });
  generateOreBlock({ ...element, ...ores, ...oreBlock, type: "volcanic" });
});
