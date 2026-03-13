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
} from "@";

type ProcessingRecipe = HasId & HasTime;
type CraftingRecipe = HasId & HasAnyInput & HasSingleOutput & HasTime;

export const craftingRecipes = {
  /** test message */
  alchemy: builder(
    (
      cfg: CraftingRecipe &
        HasTier<2> &
        HasRecipeCategories<"Alchemy_Potions" | "Alchemy_Potions_Misc" | "Alchemy_Bombs">
    ) =>
      json(`${globals().paths.recipe.json}/Alchemy/Alchemy_${cfg.id}`, [
        withAnyInput(cfg),
        withSingleOutput(cfg),
        withTime(cfg),
        withCraftingBench("Alchemybench", cfg)
      ])
  ),
  arcane: builder((cfg: CraftingRecipe & HasRecipeCategories<"Arcane_Portals" | "Arcane_Misc">) =>
    json(`${globals().paths.recipe.json}/Arcane/Arcane_${cfg.id}`, [
      withAnyInput(cfg),
      withSingleOutput(cfg),
      withCraftingBench("Arcanebench", cfg),
      withTime(cfg)
    ])
  ),
  armor: builder({
    build: (
      cfg: CraftingRecipe &
        HasTier<3> &
        HasRecipeCategories<"Armor_Head" | "Armor_Chest" | "Armor_Hands" | "Armor_Legs" | "Weapon_Shield">
    ) =>
      json(`${globals().paths.recipe.json}/Armor/Armor_${cfg.id}`, [
        withAnyInput(cfg),
        withSingleOutput(cfg),
        withCraftingBench("Armor_Bench", cfg),
        withTime(cfg)
      ])
  }),
  cooking: builder({
    build: (cfg: CraftingRecipe & HasRecipeCategories<"Prepared" | "Baked" | "Ingredients">) =>
      json(`${globals().paths.recipe.json}/Cooking/Cooking_${cfg.id}`, [
        withAnyInput(cfg),
        withSingleOutput(cfg),
        withCraftingBench("Cookingbench", cfg),
        withTime(cfg)
      ])
  }),
  farming: builder({
    build: (
      cfg: CraftingRecipe &
        HasTier<9> &
        HasRecipeCategories<"Farming" | "Seeds" | "Saplings" | "Essence" | "Planters" | "Decorative">
    ) =>
      json(`${globals().paths.recipe.json}/Farming/Farming_${cfg.id}`, [
        withAnyInput(cfg),
        withSingleOutput(cfg),
        withCraftingBench("Farming_Bench", cfg),
        withTime(cfg)
      ])
  }),
  furniture: builder({
    build: (
      cfg: CraftingRecipe &
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
      json(`${globals().paths.recipe.json}/Furniture/Furniture_${cfg.id}`, [
        withAnyInput(cfg),
        withSingleOutput(cfg),
        withCraftingBench("Furniture_Bench", cfg),
        withTime(cfg)
      ])
  }),
  loom: builder({
    build: (cfg: HasId & HasAnyInput & HasSingleOutput & HasTime & HasRecipeCategories<"All">) =>
      json(`${globals().paths.recipe.json}/Loom/Loom_${cfg.id}`, [
        withAnyInput(cfg),
        withSingleOutput(cfg),
        withCraftingBench("Loombench", cfg),
        withTime(cfg)
      ])
  }),
  weapon: builder({
    build: (
      cfg: CraftingRecipe &
        HasTier<3> &
        HasRecipeCategories<"Weapon_Sword" | "Weapon_Mace" | "Weapon_Battleaxe" | "Weapon_Daggers" | "Weapon_Bow">
    ) =>
      json(`${globals().paths.recipe.json}/Weapon/Weapon_${cfg.id}`, [
        withAnyInput(cfg),
        withSingleOutput(cfg),
        withCraftingBench("Weapon_Bench", cfg),
        withTime(cfg)
      ])
  }),
  workbench: builder({
    build: (
      cfg: CraftingRecipe &
        HasTier<3> &
        HasRecipeCategories<"Workbench_Survival" | "Workbench_Tools" | "Workbench_Crafting" | "Workbench_Tinkering">
    ) =>
      json(`${globals().paths.recipe.json}/Workbench/Workbench_${cfg.id}`, [
        withAnyInput(cfg),
        withSingleOutput(cfg),
        withCraftingBench("Workbench_Bench", cfg),
        withTime(cfg)
      ])
  })
};

export const processingRecipes = {
  salvage: builder((cfg: ProcessingRecipe & HasSingleInput & HasAnyOutput) =>
    json(`${globals().paths.recipe.json}/Salvage/Salvage_${cfg.id}`, [
      withSingleInput(cfg),
      withAnyOutput(cfg),
      withTime(cfg),
      withProcessingBench("Salvagebench", cfg)
    ])
  ),
  tannery: builder((cfg: ProcessingRecipe & HasSingleInput & HasSingleOutput & HasTier<2>) =>
    json(`${globals().paths.recipe.json}/Tannery/Tannery_${cfg.id}`, [
      withSingleInput(cfg),
      withSingleOutput(cfg),
      withTime(cfg),
      withProcessingBench("Tannery", cfg)
    ])
  ),
  furnace: builder((cfg: ProcessingRecipe & HasAnyInput & HasAnyOutput & HasTier<2>) =>
    json(`${globals().paths.recipe.json}/Furnace/Furnace_${cfg.id}`, [
      withAnyInput(cfg),
      withAnyOutput(cfg),
      withTime(cfg),
      withProcessingBench("Furnace", cfg)
    ])
  ),
  campfire: builder((cfg: ProcessingRecipe & HasSingleInput & HasSingleOutput) =>
    json(`${globals().paths.recipe.json}/Campfire/Campfire_${cfg.id}`, [
      withAnyInput(cfg),
      withSingleOutput(cfg),
      withTime(cfg),
      withProcessingBench("Campfire", cfg)
    ])
  )
};

export const structuralRecipes = {
  builders: builder((cfg: HasId & HasSingleInput & HasSingleOutput & HasTier<1>) =>
    json(`${globals().paths.recipe.json}/Builder/Builder_${cfg.id}`, [
      withSingleInput(cfg),
      withSingleOutput(cfg),
      withStructuralBench("Builders", cfg)
    ])
  )
};

export const recipes = { ...craftingRecipes, ...processingRecipes, ...structuralRecipes };
