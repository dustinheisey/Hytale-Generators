import { describe, it, expect } from "vitest";
import { matchesSchema } from "@/api/util/tests/tests";
import schema from "@schemas/recipe.schema.json" with { type: "json" };
import { craftingRecipes, processingRecipes, structuralRecipes } from "@";

const s = schema as Record<string, unknown>;

function testRecipe(name: string, data: Record<string, unknown>) {
  it(`${name} produces output that satisfies the recipe schema`, () => {
    expect(matchesSchema(s, data)).toBe(true);
  });
}

describe("craftingRecipes", () => {
  testRecipe(
    "alchemy",
    craftingRecipes
      .alchemy("test")
      .input(["2x Herb_Moonpetal"])
      .output("Potion_Health_Small")
      .time(10)
      .categories(["Alchemy_Potions"])
      .build()
  );

  testRecipe(
    "arcane",
    craftingRecipes
      .arcane("test")
      .input(["2x Crystal_Arcane"])
      .output("Portal_Stone")
      .time(15)
      .categories(["Arcane_Portals"])
      .build()
  );

  testRecipe(
    "armor",
    craftingRecipes
      .armor("test")
      .input(["4x Leather_Thick"])
      .output("Armor_Chest_Leather")
      .time(20)
      .categories(["Armor_Chest"])
      .build()
  );

  testRecipe(
    "cooking",
    craftingRecipes
      .cooking("test")
      .input(["2x Meat_Raw"])
      .output("Meat_Cooked")
      .time(5)
      .categories(["Prepared"])
      .build()
  );

  testRecipe(
    "farming",
    craftingRecipes
      .farming("test")
      .input(["3x Seed_Wheat"])
      .output("Wheat_Bundle")
      .time(30)
      .categories(["Seeds"])
      .build()
  );

  testRecipe(
    "furniture",
    craftingRecipes
      .furniture("test")
      .input(["6x Wood_Oak"])
      .output("Furniture_Bed_Oak")
      .time(25)
      .categories(["Furniture_Beds"])
      .build()
  );

  testRecipe(
    "loom",
    craftingRecipes.loom("test").input(["4x Fiber_Cotton"]).output("Cloth_Cotton").time(10).categories(["All"]).build()
  );

  testRecipe(
    "weapon",
    craftingRecipes
      .weapon("test")
      .input(["3x Iron_Ingot"])
      .output("Sword_Iron")
      .time(20)
      .categories(["Weapon_Sword"])
      .build()
  );

  testRecipe(
    "workbench",
    craftingRecipes
      .workbench("test")
      .input(["2x Iron_Ingot", "1x Wood_Oak"])
      .output("Tool_Hammer_Iron")
      .time(15)
      .categories(["Workbench_Tools"])
      .build()
  );
});

describe("processingRecipes", () => {
  testRecipe(
    "salvage",
    processingRecipes.salvage("test").input("Sword_Iron").output(["2x Iron_Ingot"]).time(5).build()
  );

  testRecipe("tannery", processingRecipes.tannery("test").input("Hide_Raw").output("Leather_Thick").time(10).build());

  testRecipe(
    "furnace",
    processingRecipes.furnace("test").input(["2x Iron_Ore"]).output(["1x Iron_Ingot"]).time(15).build()
  );

  testRecipe("campfire", processingRecipes.campfire("test").input("Meat_Raw").output("Meat_Cooked").time(5).build());
});

describe("structuralRecipes", () => {
  testRecipe("builders", structuralRecipes.builders("test").input("Stone_Block").output("Stone_Wall").build());
});
