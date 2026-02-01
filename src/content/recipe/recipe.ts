import { syncJson } from "@sync";
import { uSep } from "@text";

function benchRequirement(bench: Bench) {
  let type: CraftingType;

  switch (bench) {
    case "Alchemy_Bench":
      type = "Crafting";
      break;
    case "Arcane_Bench":
      type = "Crafting";
      break;
    case "Armory_Bench":
      type = "DiagramCrafting";
      break;
    case "Armour_Bench":
      type = "Crafting";
      break;
    case "Builders_Bench":
      type = "StructuralCrafting";
      break;
    case "Campfire_Bench":
      type = "Processing";
      break;
    case "Cooking_Bench":
      type = "Crafting";
      break;
    case "Farming_Bench":
      type = "Crafting";
      break;
    case "Furnace":
      type = "Processing";
      break;
    case "Furniture_Bench":
      type = "Crafting";
      break;
    case "Loom_Bench":
      type = "Crafting";
      break;
    case "Lumbermill_Bench":
      type = "Crafting";
      break;
    case "Salvage_Bench":
      type = "Processing";
      break;
    case "Tannery_Bench":
      type = "Processing";
      break;
    case "Trough_Bench":
      type = "Crafting";
      break;
    case "Weapon_Bench":
      type = "Crafting";
      break;
    case "Workbench":
      type = "Crafting";
      break;
    default:
      type = "Crafting";
  }

  return {
    Type: type,
    Id: bench,
  };
}

export const data = (config: RecipeConfig): ExternalRecipeData => {
  const { processingTime, inputs, outputs, bench, tier } = config;
  return {
    Input: inputs,
    PrimaryOutput: outputs[0],
    ...(outputs.length > 1 ? { Output: outputs.slice(1) } : ""),
    BenchRequirement: [
      { ...benchRequirement(bench), RequiredTierLevel: tier },
    ],
    TimeSeconds: processingTime || 10,
  };
};

export function generateRecipe(config: RecipeConfig) {
  syncJson(`Server/Item/Recipes/${uSep(config.id)}`, data(config));
}
