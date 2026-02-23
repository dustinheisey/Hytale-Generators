import { asArray, global, parseIngredient, spreadItems, syncJson, toPascal } from "../../../index.js";
import type {
  ProcessingBenchId,
  ProcessingBenchWrapper,
  ProcessingRecipeData,
  ProcessingTierFor
} from "./processing.types.js";

export function processing<B extends ProcessingBenchId>(
  id: string,
  benchId: B,
  input: string | string[],
  output: string | string[],
  time: number,
  tier?: ProcessingTierFor<B>
) {
  const outputs = asArray(output);

  const data: ProcessingRecipeData = toPascal({
    input: spreadItems(input, parseIngredient),
    primaryOutput: parseIngredient(outputs[0]),
    output: outputs.map(parseIngredient),
    benchRequirement: [
      {
        type: "Processing" as const,
        id: benchId,
        requiredTierLevel: tier ?? (1 as number)
      }
    ],
    timeSeconds: time
  });

  syncJson<ProcessingRecipeData>(`${global().outDir}/Server/Item/Recipes/Processing/${benchId}/${id}`, data);
}

function createProcessingRecipe<B extends ProcessingBenchId>(benchId: B): ProcessingBenchWrapper<B> {
  return ((
    id: string,
    input: string | string[],
    output: string | string[],
    time: number,
    tier?: ProcessingTierFor<B>
  ) => {
    processing(id, benchId, input, output, time, tier);
  }) as ProcessingBenchWrapper<B>;
}

export const tannery = createProcessingRecipe("Tannery");
export const furnace = createProcessingRecipe("Furnace");
export const campfire = createProcessingRecipe("Campfire");
export const salvage = createProcessingRecipe("Salvagebench");
