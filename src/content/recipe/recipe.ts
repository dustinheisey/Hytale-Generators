import { syncJson } from "@sync";
import { u } from "@text";

function benchRequirement(bench: Bench) {
  let type: CraftingType;

  switch (bench) {
    case "Alchemybench":
      type = "Crafting";
      break;
    case "Arcanebench":
      type = "Crafting";
      break;
    case "Armorybench":
      type = "DiagramCrafting";
      break;
    case "Armourbench":
      type = "Crafting";
      break;
    case "Buildersbench":
      type = "StructuralCrafting";
      break;
    case "Campfirebench":
      type = "Processing";
      break;
    case "Cookingbench":
      type = "Crafting";
      break;
    case "Farmingbench":
      type = "Crafting";
      break;
    case "Furnace":
      type = "Processing";
      break;
    case "Furniturebench":
      type = "Crafting";
      break;
    case "Loombench":
      type = "Crafting";
      break;
    case "Lumbermillbench":
      type = "Crafting";
      break;
    case "Salvagebench":
      type = "Processing";
      break;
    case "Tannerybench":
      type = "Processing";
      break;
    case "Troughbench":
      type = "Crafting";
      break;
    case "Weaponbench":
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
  const { processingTime, inputs, outputs, bench } = config;
  return {
    Input: inputs,
    PrimaryOutput: outputs[0],
    ...(outputs.length > 1 ? { Output: outputs.slice(1) } : ""),
    BenchRequirement: [
      benchRequirement(bench),
    ],
    TimeSeconds: processingTime || 10,
  };
};

export function generateRecipe(config: RecipeConfig) {
  syncJson(`Server/Item/CraftingRecipe/${u(config.id)}`, data(config));
}
