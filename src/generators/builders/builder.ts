import type { HasId } from "../../index.js";

/**
 * Hover<T>
 * IntelliSense wrapper to discourage expansion of huge recursive types.
 *
 * Important: use a unique symbol key so it does NOT show up in autocomplete.
 */
declare const __stageHover: unique symbol;
type Hover<T> = T & { readonly [__stageHover]?: never };

/**
 * OptionalKeys<T>
 * Produces a union of keys that are optional in T.
 */
type OptionalKeys<T extends object> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * RequiredKeys<T>
 * Produces a union of keys that are not optional in T.
 */
type RequiredKeys<T extends object> = Exclude<keyof T, OptionalKeys<T>>;

/** Optional keys excluding hidden keys (e.g. hide "id"). */
type VisibleOptionalKeys<T extends object, Hidden extends PropertyKey> = Exclude<OptionalKeys<T>, Hidden>;
/** Required keys excluding hidden keys (e.g. hide "id"). */
type VisibleRequiredKeys<T extends object, Hidden extends PropertyKey> = Exclude<RequiredKeys<T>, Hidden>;

/**
 * MissingRequired<T, S>
 * Required keys (excluding hidden keys) that have not been set yet.
 */
type MissingRequired<T extends object, S extends object, Hidden extends PropertyKey> = Exclude<
  VisibleRequiredKeys<T, Hidden>,
  keyof S
>;

/**
 * Stage<T, S>
 * Chooses which "stage" of the builder API is visible based on the current state S.
 */
export type Stage<
  T extends object,
  S extends object = Record<never, never>,
  Hidden extends PropertyKey = never
> = Hover<MissingRequired<T, S, Hidden> extends never ? OptionalStage<T, S, Hidden> : RequiredStage<T, S, Hidden>>;

type NextStage<T extends object, S extends object, Hidden extends PropertyKey, K extends keyof T> = Stage<
  T,
  S & Pick<T, K>,
  Hidden
>;

type RequiredStage<T extends object, S extends object, Hidden extends PropertyKey> = {
  [K in MissingRequired<T, S, Hidden> & string]-?: (value: T[K]) => NextStage<T, S, Hidden, K>;
};

type OptionalStage<T extends object, S extends object, Hidden extends PropertyKey> = {
  [K in VisibleOptionalKeys<T, Hidden> & string]-?: (value: T[K]) => NextStage<T, S, Hidden, K>;
} & {
  build(): void;
};

// ----------------------
// Many types
// ----------------------

export type Row<T extends HasId> = Pick<T, "id"> & Partial<Omit<T, "id">>;

export type ManyApi<T extends HasId> = Stage<T, Pick<T, "id">, "id"> & {
  /** Merge into every item (id never touched). */
  defaults(patch: Partial<Omit<T, "id">>): ManyApi<T>;
  /** Per-row computed patch. */
  each(fn: (row: Row<T>) => Partial<Omit<T, "id">>): ManyApi<T>;
};

export type RowNoId<T extends object> = Partial<T>;

export type ManyApiNoId<T extends object> = Stage<T> & {
  defaults(patch: Partial<T>): ManyApiNoId<T>;
  each(fn: (row: RowNoId<T>) => Partial<T>): ManyApiNoId<T>;
};

// ----------------------
// Runtime proxy (shared)
// ----------------------

type ProxyOptions = {
  /** Called with the final state when build() is invoked. */
  onBuild: () => void;
  /**
   * Called for setter writes. This is invoked for *all* property setters (except build).
   * Should apply to internal state(s).
   */
  onSet: (prop: string, value: unknown) => void;
  /** Keys that should not be settable at runtime. */
  hiddenKeys?: readonly string[];
};

function createStageProxy<T extends object>(opts: ProxyOptions): Stage<T> {
  const hidden = new Set(opts.hiddenKeys ?? []);

  const surface: Record<string, unknown> = {};
  const p = new Proxy(surface, {
    get(_target, prop: string | symbol): unknown {
      if (typeof prop !== "string") return undefined;

      if (prop === "build") {
        return () => {
          opts.onBuild();
        };
      }

      // Enforce "Hidden" at runtime too (fixes type/runtime inconsistency)
      if (hidden.has(prop)) {
        return undefined;
      }

      // Default: staged setter
      return (value: unknown) => {
        opts.onSet(prop, value);
        return p;
      };
    }
  });

  return p as unknown as Stage<T>;
}

// ----------------------
// Public APIs
// ----------------------

type IdSeed<T extends HasId> = Pick<T, "id">;

/**
 * A callable builder that also has .many(...)
 */
export type Builder<T extends HasId> = ((id: T["id"]) => Stage<T, IdSeed<T>, "id">) & {
  many(rows: Array<Row<T>>): ManyApi<T>;
};

type BuilderOptions<T extends HasId> = {
  /**
   * Default seed values applied before id.
   * id always wins over defaults if provided.
   */
  defaults?: Partial<T>;
};

/**
 * builder
 * Creates an id-seeded staged builder with .many baked in.
 *
 * Usage:
 *   export const dust = builder<DustCfg>((cfg) => { ...side effects... });
 *
 *   dust("id").color("red").build()
 *   dust.many([{ id: "a" }, { id: "b", color: "blue" }]).size(2).build()
 */
export function builder<T extends HasId>(buildFn: (v: T) => void, options: BuilderOptions<T> = {}): Builder<T> {
  const defaults = options.defaults ?? {};

  // ----- single -----
  const single = ((id: T["id"]) => {
    // Important: defaults first, then id so id always wins
    const state: Partial<T> = { ...defaults, id } as Partial<T>;

    return createStageProxy<T>({
      hiddenKeys: ["id"],
      onSet: (prop, value) => {
        (state as Record<string, unknown>)[prop] = value;
      },
      onBuild: () => {
        buildFn(state as T);
      }
    }) as unknown as Stage<T, IdSeed<T>, "id">;
  }) as unknown as Builder<T>;

  // ----- many (baked in) -----
  const many = (rows: Array<Row<T>>): ManyApi<T> => {
    // Store per-row state objects (seeded with id + any provided fields)
    const states: Array<Partial<T> & Pick<T, "id">> = rows.map(r => ({ ...r }) as any);

    // Shared baseline patch (starts from builder defaults, excluding id)
    const shared: Partial<Omit<T, "id">> = { ...(defaults as Partial<Omit<T, "id">>) };
    delete (shared as any).id;

    const eachFns: Array<(row: Row<T>) => Partial<Omit<T, "id">>> = [];

    // Build handler uses the SAME buildFn directly (no replay into single builder)
    const onBuild = () => {
      for (const s of states) {
        const row = s as Row<T>;
        const computed = eachFns.reduce<Partial<T>>((acc, f) => Object.assign(acc, f(row)), {});

        // precedence: builder-defaults/shared < computed < row(seed) < staged setters on s (same object)
        const finalCfg = { ...shared, ...computed, ...s } as T;

        buildFn(finalCfg);
      }
    };

    // Setter handler applies to all states
    const onSet = (prop: string, value: unknown) => {
      for (const s of states) {
        (s as Record<string, unknown>)[prop] = value;
      }
    };

    // Create a proxy surface that includes staged setters + defaults()/each()/build()
    const p = createStageProxy<T>({
      hiddenKeys: ["id"],
      onSet,
      onBuild
    });

    return p as unknown as ManyApi<T>;
  };

  return Object.assign(single, { many });
}

/**
 * Convenience helper if you prefer the old name.
 * (Optional: you can delete this and just use builder(..., { defaults }) everywhere.)
 */
export function builderWithDefaults<T extends HasId>(buildFn: (v: T) => void, defaults: Partial<T>): Builder<T> {
  return builder(buildFn, { defaults });
}

export type BuilderNoId<T extends object> = (() => Stage<T>) & {
  many(rows: Array<RowNoId<T>>): ManyApiNoId<T>;
};

type BuilderNoIdOptions<T extends object> = {
  defaults?: Partial<T>;
};

export function builderNoId<T extends object>(
  buildFn: (v: T) => void,
  options: BuilderNoIdOptions<T> = {}
): BuilderNoId<T> {
  const defaults = options.defaults ?? {};

  // ----- single -----
  const single = (() => {
    const state: Partial<T> = { ...defaults };

    return createStageProxy<T>({
      onSet: (prop, value) => {
        (state as Record<string, unknown>)[prop] = value;
      },
      onBuild: () => {
        buildFn(state as T);
      }
    }) as unknown as Stage<T>;
  }) as unknown as BuilderNoId<T>;

  // ----- many (baked in) -----
  const many = (rows: Array<RowNoId<T>>): ManyApiNoId<T> => {
    const states: Array<Partial<T>> = rows.map(r => ({ ...defaults, ...r }));

    const shared: Partial<T> = { ...defaults };
    const eachFns: Array<(row: RowNoId<T>) => Partial<T>> = [];

    return createStageProxy<T>({
      onSet: (prop, value) => {
        for (const s of states) (s as Record<string, unknown>)[prop] = value;
      },
      onBuild: () => {
        for (const s of states) {
          const row = s;
          const computed = eachFns.reduce<Partial<T>>((acc, f) => Object.assign(acc, f(row)), {});

          // precedence: shared(defaults) < computed < row(seed) < staged setters (already on s)
          const finalCfg = { ...shared, ...computed, ...s } as T;
          buildFn(finalCfg);
        }
      }
    }) as unknown as ManyApiNoId<T>;
  };

  return Object.assign(single, { many });
}
