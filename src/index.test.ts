import {
  alchemy,
  alloy,
  arcane,
  armor,
  campfire,
  categories,
  cooking,
  dust,
  farming,
  furnace,
  furniture,
  gem,
  ingot,
  loom,
  manifest,
  metal,
  ore,
  oreBlock,
  resourceType,
  salvage,
  setGlobal,
  tannery,
  weapon,
  workbench
} from "./index.js";

setGlobal("UnifiedMaterials");

manifest({
  group: "Inconvenient",
  name: "ExamplePack",
  version: "0.1.0",
  description: "This is an example pack",
  authors: [
    {
      name: "Example Name",
      url: "https://www.example.com"
    }
  ],
  website: "https://www.example.com"
});

categories({
  children: ["Gases", "Fluids", "Ores", "Gems", "Dusts", "Ingots", { id: "Alloys", icon: "Ingots" }]
});

resourceType("Dusts", "Rock");
resourceType("Alloys", "Rock");

alchemy("alchemy", "Alchemy_Potions", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
arcane("arcane", "Arcane_Misc", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
armor("armor", "Armor_Chest", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
campfire("campfire", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
cooking("cooking", "Baked", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
farming("farming", "Decorative", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
furnace("furnace", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
furniture("furniture", "Furniture_Beds", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
loom("loom", "All", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
salvage("salvage", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
tannery("tannery", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
weapon("weapon", "Weapon_Battleaxe", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
workbench("workbench", "Workbench_Crafting", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);

metal("Tin", "#dee1e1", { ores: { baseName: "Cassiterite" }, oreBlock: { exclude: ["Basalt"] } });

alloy("Bronze", "#994844", [
  { id: "2x Ingredient_Bar_Copper", name: "Copper" },
  { id: "Ingot_Tin", name: "Tin" }
]);

gem("Amethyst", "#b741cf", { variant: "dark" });
