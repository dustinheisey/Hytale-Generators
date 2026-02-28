import type { Tagged } from "type-fest";
import type { BaseCfg } from "../index.js";

/**
 * Opaque wrapper used only to stop IntelliSense from expanding huge recursive types in hovers.
 * Doesn't change runtime behavior.
 */
type Hover<T> = Tagged<T, "Stage">;

/**
 * OptionalKeys<T>
 * Produces a union of keys that are optional in T.
 *
 * For each key in T:
 * - Temporarily treat it as required (-?)
 * - Check if an empty object {} can satisfy just that property
 * - If yes → it's optional → keep the key
 * - If no → it's required → discard it
 */
type OptionalKeys<T extends object> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * RequiredKeys<T>
 * Produces a union of keys that are not optional in T.
 *
 * - Start with all keys in T (keyof T)
 * - Remove the keys that are optional (OptionalKeys<T>)
 * - What remains are the required keys
 */
type RequiredKeys<T extends object> = Exclude<keyof T, OptionalKeys<T>>;

/** Removes keys we never want to expose as setters (e.g. "id" for id-seeded builders). */
/** Optional keys excluding hidden keys (e.g. hide "id"). */
type VisibleOptionalKeys<T extends object, Hidden extends PropertyKey> = Exclude<OptionalKeys<T>, Hidden>;
/** Required keys excluding hidden keys (e.g. hide "id"). */
type VisibleRequiredKeys<T extends object, Hidden extends PropertyKey> = Exclude<RequiredKeys<T>, Hidden>;

/**
 * MissingRequired<T, S>
 * Produces a union of required keys (excluding hidden keys) from T that have NOT been set yet.
 *
 * - RequiredKeys<T> gives all required keys in the target config type T
 * - keyof S gives all keys that are currently present in the "set so far" state S
 * - Exclude removes already-set keys from the required set
 *
 * If MissingRequired<T, S> is:
 * - a union of keys (e.g. "color") -> those required fields are still missing
 * - never -> all required fields have been set
 */
type MissingRequired<T extends object, S extends object, Hidden extends PropertyKey> = Exclude<
  VisibleRequiredKeys<T, Hidden>,
  keyof S
>;

/**
 * Stage<T, S>
 * Chooses which "stage" of the builder API is visible based on the current state S.
 *
 * - If MissingRequired<T, S> is never (nothing missing), we switch to OptionalStage:
 *     - show optional setters + build()
 * - Otherwise, we stay in RequiredStage:
 *     - show only the missing required setters
 */
export type Stage<
  T extends object,
  S extends object = Record<never, never>,
  Hidden extends PropertyKey = never
> = Hover<MissingRequired<T, S, Hidden> extends never ? OptionalStage<T, S, Hidden> : RequiredStage<T, S, Hidden>>;

/**
 * NextStage<T, S, K>
 * Helper to reduce hover noise:
 * We simplify the recursive return type so VS Code is less likely to expand the entire chain.
 */
type NextStage<T extends object, S extends object, Hidden extends PropertyKey, K extends keyof T> = Stage<
  T,
  S & Pick<T, K>,
  Hidden
>;

/**
 * RequiredStage<T, S>
 * Produces the "builder surface" when required fields (excluding hidden keys) are still missing.
 *
 * - MissingRequired<T, S> computes which required keys in T are not yet set in state S
 * - For each missing required key K, we expose a method:
 *     K(value: T[K]) => nextBuilder
 * - Calling that method conceptually "sets" K, so the returned builder has an updated state:
 *     S & Pick<T, K>
 */
type RequiredStage<T extends object, S extends object, Hidden extends PropertyKey> = {
  [K in MissingRequired<T, S, Hidden> & string]-?: (value: T[K]) => NextStage<T, S, Hidden, K>;
};

/**
 * OptionalStage<T, S>
 * Produces the "builder surface" once all required fields (excluding hidden keys) are satisfied.
 *
 * - It exposes setter methods for OPTIONAL keys only (OptionalKeys<T>)
 * - It also exposes build(): void, because the config is now considered complete and build is side-effecting
 * - Each optional setter updates the type-state S to include that key:
 *     S & Pick<T, K>
 */
type OptionalStage<T extends object, S extends object, Hidden extends PropertyKey> = {
  [K in VisibleOptionalKeys<T, Hidden> & string]-?: (value: T[K]) => NextStage<T, S, Hidden, K>;
} & {
  build(): void;
};

// ----------------------
// Runtime proxy
// ----------------------

/**
 * proxyBuilder
 * Runtime Proxy:
 * - any property access returns a setter function
 * - build() calls onBuild with the accumulated state
 */
function proxy<T extends object>(onBuild: (cfg: T) => void, initial: Partial<T> = {}): Stage<T> {
  const state: Partial<T> = { ...initial };

  const surface: Record<string, unknown> = {};
  const p = new Proxy(surface, {
    get(_target, prop: string | symbol): unknown {
      if (prop === "build") {
        return () => {
          onBuild(state as T);
        };
      }
      if (typeof prop !== "string") return undefined;

      return (value: unknown) => {
        (state as Record<string, unknown>)[prop] = value;
        return p;
      };
    }
  });

  return p as unknown as Stage<T>;
}

// ----------------------
// Public APIs
// ----------------------

/**
 * builder
 * Consumer-facing helper to create builders with minimal boilerplate.
 *
 * Usage:
 *   export const dust: Builder<DustCfg> = builder((cfg: DustCfg) => { ...side effects... });
 *
 * - returned function takes an id
 * - id is seeded immediately into the internal state
 * - build() runs buildFn with the final config object
 */
type IdSeed<T extends BaseCfg> = Pick<T, "id">;
export type Builder<T extends BaseCfg> = (id: T["id"]) => Stage<T, IdSeed<T>, "id">;

export function builder<T extends BaseCfg>(buildFn: (v: T) => void): Builder<T> {
  return (id: T["id"]) => {
    const b = proxy<T>(buildFn, { id } as Partial<T>);
    return b as ReturnType<Builder<T>>;
  };
}

/**
 * BuilderNoId<T>
 * No id required/seeded. Nothing is hidden.
 *
 * Call shape:
 *   thing().method1(...).method2(...).build()
 */
export type BuilderNoId<T extends object> = () => Stage<T>;

export function builderNoId<T extends object>(buildFn: (v: T) => void): BuilderNoId<T> {
  return () => proxy<T>(buildFn);
}

export function builderWithDefaults<T extends BaseCfg>(buildFn: (v: T) => void, defaults: Partial<T>): Builder<T> {
  return (id: T["id"]) => {
    // important: defaults first, then id so id always wins if present
    const b = proxy<T>(buildFn, { ...defaults, id } as Partial<T>);
    return b as ReturnType<Builder<T>>;
  };
}
