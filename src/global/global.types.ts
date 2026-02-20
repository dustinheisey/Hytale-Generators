export type AutoComplete<T extends string> = T | (string & {});

type KeyOnlyInFirst<First, Second> = Exclude<keyof First, keyof Second>;

export type Exact<Actual extends Wanted, Wanted> = {
  [Key in keyof Actual]: Key extends KeyOnlyInFirst<Actual, Wanted> ? never : Actual[Key];
};
export type Override<T, R> = Omit<T, keyof R> & R;
export type RequireKeys<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type Ingredient =
  | { ItemId: string; Quantity: number }
  | { ResourceTypeId: string; Quantity: number }
  | { TagId: string; Quantity: number };
