import {
  builder,
  globals,
  json,
  type HasId,
  type HasTime,
  type HasSingleOutput,
  type HasAnyInput,
  type HasTier,
  type HasRecipeCategories,
  type HasSingleInput,
  type HasAnyOutput,
  withAnyInput,
  withSingleOutput,
  withTime,
  withCraftingBench,
  withSingleInput,
  withAnyOutput,
  withProcessingBench,
  withStructuralBench
} from "#hg";

type ProcessingRecipe = HasId & HasTime;
type CraftingRecipe = HasId & HasAnyInput & HasSingleOutput & HasTime;

export const craftingRecipes = {
  /** test message */
  alchemy: builder(
    (
      recipe: CraftingRecipe &
        HasTier<2> &
        HasRecipeCategories<"Alchemy_Potions" | "Alchemy_Potions_Misc" | "Alchemy_Bombs">
    ) =>
      json(`${globals().paths.recipe.json}/Alchemy/Alchemy_${recipe.id}`, [
        withAnyInput,
        withSingleOutput,
        withTime,
        withCraftingBench("Alchemybench")
      ])
  ),
  arcane: builder((recipe: CraftingRecipe & HasRecipeCategories<"Arcane_Portals" | "Arcane_Misc">) =>
    json(`${globals().paths.recipe.json}/Arcane/Arcane_${recipe.id}`, [
      withAnyInput,
      withSingleOutput,
      withCraftingBench("Arcanebench"),
      withTime
    ])
  ),
  armor: builder({
    build: (
      recipe: CraftingRecipe &
        HasTier<3> &
        HasRecipeCategories<"Armor_Head" | "Armor_Chest" | "Armor_Hands" | "Armor_Legs" | "Weapon_Shield">
    ) =>
      json(`${globals().paths.recipe.json}/Armor/Armor_${recipe.id}`, [
        withAnyInput,
        withSingleOutput,
        withCraftingBench("Armor_Bench"),
        withTime
      ])
  }),
  cooking: builder({
    build: (recipe: CraftingRecipe & HasRecipeCategories<"Prepared" | "Baked" | "Ingredients">) =>
      json(`${globals().paths.recipe.json}/Cooking/Cooking_${recipe.id}`, [
        withAnyInput,
        withSingleOutput,
        withCraftingBench("Cookingbench"),
        withTime
      ])
  }),
  farming: builder({
    build: (
      recipe: CraftingRecipe &
        HasTier<9> &
        HasRecipeCategories<"Farming" | "Seeds" | "Saplings" | "Essence" | "Planters" | "Decorative">
    ) =>
      json(`${globals().paths.recipe.json}/Farming/Farming_${recipe.id}`, [
        withAnyInput,
        withSingleOutput,
        withCraftingBench("Farming_Bench"),
        withTime
      ])
  }),
  furniture: builder({
    build: (
      recipe: CraftingRecipe &
        HasRecipeCategories<
          | "Furniture_Storage"
          | "Furniture_Beds"
          | "Furniture_Lighting"
          | "Furniture_Pottery"
          | "Furniture_Textiles"
          | "Furniture_Village_Walls"
          | "Furniture_Misc"
          | "Furniture_Seasonal"
        >
    ) =>
      json(`${globals().paths.recipe.json}/Furniture/Furniture_${recipe.id}`, [
        withAnyInput,
        withSingleOutput,
        withCraftingBench("Furniture_Bench"),
        withTime
      ])
  }),
  loom: builder({
    build: (recipe: HasId & HasAnyInput & HasSingleOutput & HasTime & HasRecipeCategories<"All">) =>
      json(`${globals().paths.recipe.json}/Loom/Loom_${recipe.id}`, [
        withAnyInput,
        withSingleOutput,
        withCraftingBench("Loombench"),
        withTime
      ])
  }),
  weapon: builder({
    build: (
      recipe: CraftingRecipe &
        HasTier<3> &
        HasRecipeCategories<"Weapon_Sword" | "Weapon_Mace" | "Weapon_Battleaxe" | "Weapon_Daggers" | "Weapon_Bow">
    ) =>
      json(`${globals().paths.recipe.json}/Weapon/Weapon_${recipe.id}`, [
        withAnyInput,
        withSingleOutput,
        withCraftingBench("Weapon_Bench"),
        withTime
      ])
  }),
  workbench: builder({
    build: (
      recipe: CraftingRecipe &
        HasTier<3> &
        HasRecipeCategories<"Workbench_Survival" | "Workbench_Tools" | "Workbench_Crafting" | "Workbench_Tinkering">
    ) =>
      json(`${globals().paths.recipe.json}/Workbench/Workbench_${recipe.id}`, [
        withAnyInput,
        withSingleOutput,
        withCraftingBench("Workbench_Bench"),
        withTime
      ])
  })
};

export const processingRecipes = {
  salvage: builder((recipe: ProcessingRecipe & HasSingleInput & HasAnyOutput) =>
    json(`${globals().paths.recipe.json}/Salvage/Salvage_${recipe.id}`, [
      withSingleInput(recipe),
      withAnyOutput(recipe),
      withTime(recipe),
      withProcessingBench("Salvagebench")
    ])
  ),
  tannery: builder((recipe: ProcessingRecipe & HasSingleInput & HasSingleOutput & HasTier<2>) =>
    json(`${globals().paths.recipe.json}/Tannery/Tannery_${recipe.id}`, [
      withSingleInput(recipe),
      withSingleOutput(recipe),
      withTime(recipe),
      withProcessingBench("Tannery")
    ])
  ),
  furnace: builder((recipe: ProcessingRecipe & HasAnyInput & HasAnyOutput & HasTier<2>) =>
    json(`${globals().paths.recipe.json}/Furnace/Furnace_${recipe.id}`, [
      withAnyInput(recipe),
      withAnyOutput(recipe),
      withTime(recipe),
      withProcessingBench("Furnace")
    ])
  ),
  campfire: builder((recipe: ProcessingRecipe & HasSingleInput & HasSingleOutput) =>
    json(`${globals().paths.recipe.json}/Campfire/Campfire_${recipe.id}`, [
      withSingleInput(recipe),
      withSingleOutput(recipe),
      withProcessingBench("Campfire"),
      withTime(recipe)
    ])
  )
};

export const structuralRecipes = {
  builders: builder((recipe: HasId & HasSingleInput & HasSingleOutput & HasTier<1>) =>
    json(`${globals().paths.recipe.json}/Builder/Builder_${recipe.id}`, [
      withSingleInput(recipe),
      withSingleOutput(recipe),
      withStructuralBench("Builders")
    ])
  )
};

export const recipes = { ...craftingRecipes, ...processingRecipes, ...structuralRecipes };
