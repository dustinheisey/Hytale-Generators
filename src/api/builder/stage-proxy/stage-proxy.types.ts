/** Keys that are optional in T */
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

/** Keys that are required in T */
export type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>;

/** Required keys excluding hidden and already-set keys */
type MissingRequired<Config, Set, Hidden extends PropertyKey> = Exclude<
  Exclude<RequiredKeys<Config>, Hidden>,
  keyof Set
>;

/** Advances the stage by marking key K as set */
type NextStage<Config extends object, Set extends object, Hidden extends PropertyKey, K extends keyof Config> = Stage<
  Config,
  Set & Pick<Config, K>,
  Hidden
>;

/** Builder methods for remaining required keys */
type RequiredStage<Config extends object, Set extends object, Hidden extends PropertyKey> = {
  [K in MissingRequired<Config, Set, Hidden> & string]-?: (value: Config[K]) => NextStage<Config, Set, Hidden, K>;
};

/** Builder methods for optional keys, plus build() */
type OptionalStage<Config extends object, Set extends object, Hidden extends PropertyKey> = {
  [K in Exclude<OptionalKeys<Config>, Hidden> & string]-?: (value: Config[K]) => NextStage<Config, Set, Hidden, K>;
} & { build(): Record<string, unknown> };

/** Prevents IntelliSense from fully expanding deeply recursive types */
declare const _opaque: unique symbol;
type OpaqueOnHover<T> = T & { [_opaque]?: never };

/**
 * The public stage type. Resolves to RequiredStage until all required keys are set,
 * then resolves to OptionalStage which exposes build().
 */
export type Stage<
  Config extends object,
  Set extends object = Record<never, never>,
  Hidden extends PropertyKey = never
> = OpaqueOnHover<
  MissingRequired<Config, Set, Hidden> extends never
    ? OptionalStage<Config, Set, Hidden>
    : RequiredStage<Config, Set, Hidden>
>;
