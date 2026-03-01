import { categories, ingredients, manifest, resourceType, setGlobal } from "hytale-generators";

setGlobal("HytaleGenerators");

manifest()
  .group("Inconvenient")
  .name("HytaleGenerators")
  .version("0.3.0")
  .description("This is an example pack")
  .authors([{ name: "Example Name", url: "https://www.example.com" }])
  .website("https://www.example.com")
  .serverVersion("3432434")
  .build();

categories()
  .children(["Gases", "Fluids", "Ores", "Gems", "Dusts", "Ingots", { id: "Alloys", icon: "Ingots" }])
  .build();

resourceType("Dusts").icon("Rock").build();
resourceType("Alloys").icon("Rock").build();

// alchemy("alchemy", "Alchemy_Potions", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
// arcane("arcane", "Arcane_Misc", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
// armor("armor", "Armor_Chest", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
// campfire("campfire", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
// cooking("cooking", "Baked", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
// farming("farming", "Decorative", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
// furnace("furnace", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
// furniture("furniture", "Furniture_Beds", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
// loom("loom", "All", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
// salvage("salvage", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
// tannery("tannery", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
// weapon("weapon", "Weapon_Battleaxe", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);
// workbench("workbench", "Workbench_Crafting", "2x Ingredient_Bar_Adamantite", "2x Ingredient_Bar_Thorium", 10);

const { rods, bars, wires } = ingredients([
  { id: "Rods", defaults: {} },
  { id: "Bars", defaults: { baseName: "TestingName" } },
  { id: "Wires", defaults: { mask: "Bar/Bar" } }
]);

const { alloy, bar, dust } = ingredients();

rods("Tin").color("#dee1e1").build();
bars("Tin").color("#dee1e1").build();
wires("Bronze").color("#c07e0c").build();

bar("Tin").color("#dee1e1").build();
dust("Tin").color("#dee1e1").build();
alloy("Bronze").color("#c07e0c").build();

// metal({
//   id: "Tin",
//   color: "#dee1e1",
//   exclude: ["basalt"],
//   ores: { baseName: "Cassiterite" }
// });

// metal({
//   id: "Copper",
//   color: "#dee1e1",
//   exclude: ["basalt"],
//   ores: { baseName: "Cassiterite", description: "Hello World" }
// });

// alloy({
//   id: "Bronze",
//   color: "#994844",
//   inputs: [
//     { id: "2x Ingredient_Bar_Copper", name: "Copper" },
//     { id: "Ingot_Tin", name: "Tin" }
//   ]
// });

// gem({ id: "Amethyst", color: "#b741cf", maskVariant: "dark" });
