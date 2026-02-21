export type AutoComplete<T extends string> = T | (string & {});

export type Ingredient =
  | { ItemId: string; Quantity: number }
  | { ResourceTypeId: string; Quantity: number }
  | { TagId: string; Quantity: number };
