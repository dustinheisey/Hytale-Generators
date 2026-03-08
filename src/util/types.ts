export type AutoComplete<T extends string> = T | (string & {});

export type OrString<T> = T | string;

export type OneOrMany<T> = T | readonly T[];

export type OnlyFirst<T, K> = T & { [Key in keyof Omit<K, keyof T>]?: never };

export type OneOfSimple<T, K> = OnlyFirst<T, K> | OnlyFirst<K, T>;

type MergeTypes<TypesArray extends unknown[], Res = {}> = TypesArray extends [infer Head, ...infer Rem]
  ? MergeTypes<Rem, Res & Head>
  : Res;

export type OneOf<
  TypesArray extends unknown[],
  Res = never,
  AllProperties = MergeTypes<TypesArray>
> = TypesArray extends [infer Head, ...infer Rem]
  ? OneOf<Rem, Res | OnlyFirst<Head, AllProperties>, AllProperties>
  : Res;

export type Flatten<T> = T[] | Record<string, T[]> | { [key: string]: Flatten<T> };

export type NoId<T> = Omit<T, "id">;

export type NonEmptyArray<T> = [T, ...T[]];

export function assertNonEmpty<T>(arr: T[]): asserts arr is NonEmptyArray<T> {
  if (arr.length === 0) {
    throw new Error("Expected non-empty array");
  }
}
