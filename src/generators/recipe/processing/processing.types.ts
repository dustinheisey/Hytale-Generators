import type { IntClosedRange as Range } from "type-fest";
import type { Ingredient, Pascal } from "../../../index.js";

export interface ProcessingBench {
  Salvagebench: {};
  Campfire: {};
  Furnace: { Tier: Range<1, 2> };
  Tannery: { Tier: Range<1, 2> };
}

export type ProcessingBenchId = keyof ProcessingBench;
export type ProcessingTierFor<B extends ProcessingBenchId> = ProcessingBench[B] extends { Tier: infer T extends number }
  ? T
  : never;
type ProcessingBenchesWithTier = {
  [B in ProcessingBenchId]: ProcessingTierFor<B> extends never ? never : B;
}[ProcessingBenchId];

export interface ProcessingRecipeConfig<B extends ProcessingBenchId = ProcessingBenchId> {
  id: string;
  benchId: B;
  input: string | string[];
  output: string | string[];
  time: number;
  tier?: ProcessingTierFor<B>;
}

export type ProcessingRecipeData = Pascal<{
  input: Ingredient[];
  primaryOutput: Ingredient;
  output: Ingredient[];
  benchRequirement: {
    type: "Processing";
    id: ProcessingBenchId;
    requiredTierLevel: number;
  }[];
  timeSeconds: number;
}>;

export type ProcessingBenchWrapper<B extends ProcessingBenchId> = B extends ProcessingBenchesWithTier
  ? (id: string, input: string | string[], output: string | string[], time: number, tier?: ProcessingTierFor<B>) => void
  : (id: string, input: string | string[], output: string | string[], time: number) => void;
