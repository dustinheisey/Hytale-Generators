import { type Builder, type HasId } from "@";

export type Type<Config extends HasId> = Config["id"] | { id: Config["id"]; defaults: Partial<Config> };

export type GroupSpec<Config extends HasId> = {
  id: Config["id"];
  defaults: Partial<Config>;
};

type TypeId<T> = T extends string ? T : T extends { id: infer I } ? I : never;

export type BuildersFromTypes<
  Config extends HasId,
  ExtraArgs extends unknown[],
  InitKeys extends string,
  Types extends readonly Type<Config>[]
> = {
  [T in Types[number] as Lowercase<TypeId<T> & string>]: Builder<Config, ExtraArgs, InitKeys>;
};
