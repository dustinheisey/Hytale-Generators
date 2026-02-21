import { global, parseIngredient, spreadItems, syncJson, toPascal } from "../../../index.js";
import type {
  BenchWrapper,
  CategoryFor,
  CraftingBenchId,
  CraftingRecipeData,
  CraftingTierFor
} from "./crafting.types.js";

export function crafting<B extends CraftingBenchId>(
  id: string,
  benchId: B,
  category: CategoryFor<B> | CategoryFor<B>[],
  input: string | string[],
  output: string,
  time: number,
  tier?: CraftingTierFor<B>
) {
  const data: CraftingRecipeData = toPascal({
    input: spreadItems(input, parseIngredient),
    primaryOutput: parseIngredient(output),
    benchRequirement: [
      {
        type: "Crafting" as const,
        id: benchId,
        requiredTierLevel: tier ?? 1,
        categories: spreadItems(category, c => c)
      }
    ],
    timeSeconds: time
  });

  syncJson<CraftingRecipeData>(`${global().outDir}/Server/Item/Recipes/Crafting/${benchId}/${id}`, data);
}

function createCraftingRecipe<B extends CraftingBenchId>(benchId: B): BenchWrapper<B> {
  return ((id: string, category: any, input: any, output: any, time: any, tier?: any) => {
    crafting(id, benchId, category, input, output, time, tier);
  }) as BenchWrapper<B>;
}

export const arcane = createCraftingRecipe("Arcanebench");
export const alchemy = createCraftingRecipe("Alchemybench");
export const weapon = createCraftingRecipe("Weapon_Bench");
export const workbench = createCraftingRecipe("Workbench");
export const furniture = createCraftingRecipe("Furniture_Bench");
export const farming = createCraftingRecipe("Farmingbench");
export const cooking = createCraftingRecipe("Cookingbench");
export const armor = createCraftingRecipe("Armor_Bench");
export const loom = createCraftingRecipe("Loombench");
