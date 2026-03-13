import { recipes } from "@";
import { describeSchema } from "@/api/util/tests/tests";
import schema from "@schemas/recipe.schema.json" with { type: "json" };

describeSchema("recipes", schema, test => {
  test(
    "alchemy",
    recipes
      .alchemy("alchemy")
      .categories(["Alchemy_Bombs"])
      .input("2x Ingredient_Bar_Thorium")
      .output("Ingredient_Bar_Adamantite")
      .time(14)
      .tier(2)
      .build()
  );
  test(
    "arcane",
    recipes
      .arcane("arcane")
      .categories(["Arcane_Misc"])
      .input("2x Ingredient_Bar_Thorium")
      .output("Ingredient_Bar_Adamantite")
      .time(14)
      .build()
  );
  test(
    "armor",
    recipes
      .armor("armor")
      .categories(["Armor_Chest"])
      .input("2x Ingredient_Bar_Thorium")
      .output("Ingredient_Bar_Adamantite")
      .time(14)
      .tier(2)
      .build()
  );
  test(
    "cooking",
    recipes
      .cooking("cooking")
      .categories(["Baked"])
      .input("2x Ingredient_Bar_Thorium")
      .output("Ingredient_Bar_Adamantite")
      .time(14)
      .build()
  );
  test(
    "farming",
    recipes
      .farming("farming")
      .categories(["Farming"])
      .input("2x Ingredient_Bar_Thorium")
      .output("Ingredient_Bar_Adamantite")
      .time(14)
      .tier(2)
      .build()
  );
  test(
    "furniture",
    recipes
      .furniture("furniture")
      .categories(["Furniture_Beds"])
      .input("2x Ingredient_Bar_Thorium")
      .output("Ingredient_Bar_Adamantite")
      .time(14)
      .build()
  );
  test(
    "loom",
    recipes
      .loom("loom")
      .categories(["All"])
      .input("2x Ingredient_Bar_Thorium")
      .output("Ingredient_Bar_Adamantite")
      .time(14)
      .build()
  );
  test(
    "weapon",
    recipes
      .weapon("weapon")
      .categories(["Weapon_Battleaxe"])
      .input("2x Ingredient_Bar_Thorium")
      .output("Ingredient_Bar_Adamantite")
      .time(14)
      .tier(2)
      .build()
  );
  test(
    "workbench",
    recipes
      .workbench("workbench")
      .categories(["Workbench_Crafting"])
      .input("2x Ingredient_Bar_Thorium")
      .output("Ingredient_Bar_Adamantite")
      .time(14)
      .tier(2)
      .build()
  );

  test(
    "salvage",
    recipes.salvage("salvage").input("2x Ingredient_Bar_Thorium").output("Ingredient_Bar_Adamantite").time(14).build()
  );
  test(
    "tannery",
    recipes
      .tannery("tannery")
      .input("2x Ingredient_Bar_Thorium")
      .output("Ingredient_Bar_Adamantite")
      .time(14)
      .tier(2)
      .build()
  );
  test(
    "furnace",
    recipes
      .furnace("furnace")
      .input("2x Ingredient_Bar_Thorium")
      .output("Ingredient_Bar_Adamantite")
      .time(14)
      .tier(2)
      .build()
  );
  test(
    "campfire",
    recipes.campfire("campfire").input("2x Ingredient_Bar_Thorium").output("Ingredient_Bar_Adamantite").time(14).build()
  );

  test(
    "builders",
    recipes.builders("builders").input("2x Ingredient_Bar_Thorium").output("Ingredient_Bar_Adamantite").build()
  );
});
