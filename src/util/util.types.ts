export type AutoComplete<T extends string> = T | (string & {});

export const isString = (arg: unknown) => typeof arg === "string";

export const isNumber = (arg: unknown) => typeof arg === "number";
