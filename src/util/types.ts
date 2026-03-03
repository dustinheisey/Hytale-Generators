export type AutoComplete<T extends string> = T | (string & {});

export type OrString<T> = T | string;

export type OneOrMany<T> = T | readonly T[];

export type OnlyFirst<T, K> = T & {[Key in keyof Omit<K, keyof T>]?: never};

export type OneOfSimple<T, K> = OnlyFirst<T, K> | OnlyFirst<K, T>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MergeTypes<TypesArray extends unknown[], Res = {}> = TypesArray extends [infer Head, ...infer Rem] ? MergeTypes<Rem, Res & Head> : Res;

type OneOf<
TypesArray extends unknown[],
Res = never,
AllProperties = MergeTypes<TypesArray>
> = TypesArray extends [infer Head, ...infer Rem] ? OneOf<Rem, Res | OnlyFirst<Head, AllProperties>, AllProperties> : Res; 
