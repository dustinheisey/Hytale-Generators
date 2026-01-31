import { syncJson, syncPublic } from "./util/sync/sync.ts";
import {
  generateCategories,
  generateDust,
  generateGem,
  generateIngot,
  generateOre,
  generateOreBlock,
} from "@generators";

import { categories } from "@configs";

/*
  - [x] Step 1: Copy public folder
  - [x] Step 2: Append lang correctly
  - [x] Step 3: Generate textures correctly
  - [ ] Step 5: add creative tab json
  - [ ] Step 6: add resource type json
  - [ ] Step 4: Generate json correctly
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

generateCategories(categories);

test.forEach((element) => {
  generateDust(element);
  generateGem(element);
  generateIngot(element);
  generateOre(element);
  generateOreBlock("stone", element);
  generateOreBlock("basalt", element);
  generateOreBlock("sandstone", element);
  generateOreBlock("shale", element);
  generateOreBlock("slate", element);
  generateOreBlock("volcanic", element);
});
