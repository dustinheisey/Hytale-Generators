import {
  alchemy,
  arcane,
  armor,
  bench,
  blockSet,
  builders,
  buildingBlock,
  campfire,
  categories,
  cooking,
  farming,
  furnace,
  furniture,
  gem,
  hitbox,
  loom,
  manifest,
  materials,
  ore,
  oreBlock,
  resourceType,
  salvage,
  setGlobal,
  tannery,
  weapon,
  workbench
} from "#hg/index";

setGlobal({ modId: "HytaleGenerators", outDir: "test" });

manifest()
  .name("Example")
  .authors([{ name: "test" }])
  .description("test")
  .group("test")
  .serverVersion("test")
  .version("test")
  .website("test")
  .build();

categories()
  .children(["hello", { id: "hello2", icon: "rocks" }])
  .build();

resourceType
  .many([
    { id: "hello", icon: "Rock" },
    { id: "hello2", icon: "Rock" },
    { id: "hello3", icon: "Rock" },
    { id: "hello4", icon: "Rock" },
    { id: "hello5", icon: "Rock" },
    { id: "hello6", icon: "Rock" },
    { id: "hello7", icon: "Rock" }
  ])
  .build();

alchemy("alchemy")
  .categories("Alchemy_Bombs")
  .input("2x Ingredient_Bar_Adamantite")
  .output("3x Ingredient_Bar_Thorium")
  .time(14)
  .tier(2)
  .build();

arcane("arcane")
  .categories("Arcane_Misc")
  .input("2x Ingredient_Bar_Adamantite")
  .output("3x Ingredient_Bar_Thorium")
  .time(14)
  .build();

armor("armor")
  .categories("Armor_Chest")
  .input("2x Ingredient_Bar_Adamantite")
  .output("3x Ingredient_Bar_Thorium")
  .time(14)
  .tier(2)
  .build();

cooking("cooking")
  .categories("Baked")
  .input("2x Ingredient_Bar_Adamantite")
  .output("3x Ingredient_Bar_Thorium")
  .time(14)
  .build();

farming("farming")
  .categories("Decorative")
  .input("2x Ingredient_Bar_Adamantite")
  .output("3x Ingredient_Bar_Thorium")
  .time(14)
  .tier(2)
  .build();

furniture("furniture")
  .categories("Furniture_Beds")
  .input("2x Ingredient_Bar_Adamantite")
  .output("3x Ingredient_Bar_Thorium")
  .time(14)
  .build();

loom("loom")
  .categories("All")
  .input("2x Ingredient_Bar_Adamantite")
  .output("3x Ingredient_Bar_Thorium")
  .time(14)
  .build();

weapon("weapon")
  .categories("Weapon_Battleaxe")
  .input("2x Ingredient_Bar_Adamantite")
  .output("3x Ingredient_Bar_Thorium")
  .time(14)
  .tier(2)
  .build();

workbench("workbench")
  .categories("Workbench_Crafting")
  .input("2x Ingredient_Bar_Adamantite")
  .output("3x Ingredient_Bar_Thorium")
  .time(14)
  .tier(2)
  .build();

alchemy("alchemy")
  .categories("Alchemy_Bombs")
  .input("2x Ingredient_Bar_Adamantite")
  .output("3x Ingredient_Bar_Thorium")
  .time(14)
  .tier(2)
  .build();

builders("builders").input("Ingredient_Bar_Adamantite").output("Ingredient_Bar_Thorium").build();
campfire("campfire").input("Ingredient_Bar_Adamantite").output("Ingredient_Bar_Thorium").time(14).build();
salvage("salvage").input("Ingredient_Bar_Adamantite").output("Ingredient_Bar_Thorium").time(14).build();
tannery("tannery").input("Ingredient_Bar_Adamantite").output("Ingredient_Bar_Thorium").time(14).build();
furnace("furnace").input("Ingredient_Bar_Adamantite").output("Ingredient_Bar_Thorium").time(14).build();

bench("bench").color("#000000").filterValidIngredients(true).outputSlotsCount(6).build();
blockSet("blockset").includeBlockGroups(["Waste"]).build();
buildingBlock("buildingBlock").color("#000000").build();
gem("gem").color("#000000").build();
oreBlock("Tin").color("#000000").strata("Basalt").build();
hitbox("hitbox").max(1).min(0).build();

const { dust, alloy, bar } = materials();
dust("dust").color("#000000").build();
alloy("alloy").color("#000000").build();
bar("bar").color("#000000").build();

ore("ore").color("#000000").build();
