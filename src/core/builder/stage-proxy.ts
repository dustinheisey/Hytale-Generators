declare const __OpaqueOnHover: unique symbol;

/**
 * OpaqueOnHover<T>
 * Prevents IntelliSense from fully expanding deeply recursive types.
 */
type OpaqueOnHover<T> = T & { [__OpaqueOnHover]?: never };

/** Keys that are optional in T */
type OptionalKeys<T extends object> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

/** Keys that are required in T */
type RequiredKeys<T extends object> = Exclude<keyof T, OptionalKeys<T>>;

/** Visible Keys that are optional in T */
type VisibleOptionalKeys<T extends object, Hidden extends PropertyKey> = Exclude<OptionalKeys<T>, Hidden>;

/** Visible Keys that are required in T */
type VisibleRequiredKeys<T extends object, Hidden extends PropertyKey> = Exclude<RequiredKeys<T>, Hidden>;

/** Required Keys that have not been set yet in T */
type MissingRequired<T extends object, S extends object, Hidden extends PropertyKey> = Exclude<
  VisibleRequiredKeys<T, Hidden>,
  keyof S
>;

/** Remaining required stages that have not been set yet */
type RequiredStage<T extends object, S extends object, Hidden extends PropertyKey> = {
  [K in MissingRequired<T, S, Hidden> & string]-?: (value: T[K]) => NextStage<T, S, Hidden, K>;
};

/** All optional stages that are not hidden */
type OptionalStage<T extends object, S extends object, Hidden extends PropertyKey> = {
  [K in VisibleOptionalKeys<T, Hidden> & string]-?: (value: T[K]) => NextStage<T, S, Hidden, K>;
} & {
  build(): void;
};

/** Chooses which "stage" of the builder API is visible based on the current state S. */
export type Stage<
  T extends object,
  S extends object = Record<never, never>,
  Hidden extends PropertyKey = never
> = OpaqueOnHover<
  MissingRequired<T, S, Hidden> extends never ? OptionalStage<T, S, Hidden> : RequiredStage<T, S, Hidden>
>;

type NextStage<T extends object, S extends object, Hidden extends PropertyKey, K extends keyof T> = Stage<
  T,
  S & Pick<T, K>,
  Hidden
>;

/**
 * Runtime implementation of Stage<T> using a Proxy.
 *
 * At runtime we do NOT actually have different "stages" objects.
 * We return the same Proxy every time. The Stage<T> type enforces the stage logic.
 */

export type ProxyOptions = {
  /** Called when build() is invoked */
  onBuild: () => void;
  /** Called for any setter write: foo(value) */
  onSet: (prop: string, value: unknown) => void;
  /** Keys that should not be settable at runtime (e.g. "id") */
  hiddenKeys?: readonly string[];
  /** Extra methods to expose on the proxy (defaults/each/etc) */
  extra?: Record<string, unknown>;
};

export function createStageProxy<
  T extends object,
  S extends object = Record<never, never>,
  Hidden extends PropertyKey = never
>(opts: ProxyOptions): Stage<T, S, Hidden> {
  const hidden = opts.hiddenKeys ?? [];
  const surface: Record<string, unknown> = { ...(opts.extra ?? {}) };

  const proxy = new Proxy(surface, {
    get(target, prop: string | symbol): unknown {
      if (typeof prop !== "string" || hidden.includes(prop)) return undefined;

      // custom methods like defaults()/each(), if called, return that actual function and not the default setter
      if (prop in target) return target[prop];

      if (prop === "build")
        return () => {
          opts.onBuild();
        };

      return (value: unknown) => {
        opts.onSet(prop, value);
        return proxy;
      };
    }
  });

  return proxy as unknown as Stage<T, S, Hidden>;
}
