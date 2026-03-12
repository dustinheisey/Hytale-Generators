import { type Flatten, type HasId, type Stage } from "#hg";

export type IsIdBased<Config> = Config extends HasId ? true : false;

/** Full args for a builder — prepends id if Config extends HasId, then appends extra init args */
type FullArgs<Config, ExtraArgs extends unknown[]> = Config extends HasId ? [id: string, ...ExtraArgs] : [...ExtraArgs];

/** Properties that are always set internally by builder — never required from the caller */
export type AlwaysSet<Config extends object, InitKeys extends string = never> = object &
  (Config extends HasId ? { id: string } : object) &
  Pick<Partial<Config>, InitKeys & keyof Config>;

/** "id" and init keys are hidden from the stage since they are set via function args */
export type DefaultHiddenKeys<Config, InitKeys extends string = never> =
  | (Config extends HasId ? "id" : never)
  | InitKeys;

export type ManyBuilder<Config extends object> = {
  defaults(values: Partial<Config>): ManyBuilder<Config>;
  build(): void;
};

/** The normalized input type for builder.many() — id and type are always omitted since they are set internally */
export type ManyInput<Config extends object> = Config extends HasId
  ? Flatten<Omit<Config, "type"> | string>
  : Flatten<Omit<Config, "type">>;

export type Builder<Config extends object, ExtraArgs extends unknown[] = [], InitKeys extends string = never> = ((
  ...args: FullArgs<Config, ExtraArgs>
) => Stage<Config, AlwaysSet<Config, InitKeys>, DefaultHiddenKeys<Config, InitKeys>>) & {
  many(configs: ManyInput<Config>): ManyBuilder<Config>;
};
