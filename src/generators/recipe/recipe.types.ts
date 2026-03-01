import { IntClosedRange } from "type-fest";

export type Ingredient =
  | { ItemId: string; Quantity: number }
  | { ResourceTypeId: string; Quantity: number }
  | { TagId: string; Quantity: number };

export interface HasSingleInput {
  input: string;
}

export interface HasMultipleInputs {
  input: string[];
}

export interface HasAnyInput {
  input: string | string[];
}

export interface HasSingleOutput {
  output: string;
}

export interface HasMultipleOutputs {
  output: string[];
}

export interface HasAnyOutput {
  output: string | string[];
}

export interface HasTime {
  time: number;
}

export type HasCategories<T extends string> = {
  categories: T | T[];
};

export type HasTier<T extends number> = { tier?: IntClosedRange<1, T> };
