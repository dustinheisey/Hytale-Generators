import { flatten, isRecord, isString, type Flatten } from "../../index.js";
import { createStageProxy, type Stage } from "./stage-proxy.js";

export type BuilderCfg<Config extends object> = {
  defaults?: Partial<Config>;
  hiddenKeys?: readonly (keyof Config & string)[];
  extra?: Record<string, unknown>;
  set?: (state: Record<string, unknown>, prop: string, value: unknown) => void;
};

export type DefaultHiddenKeys<Config> = Config extends { id: string } ? "id" : never;

/* ------------------------------------------------ */
/* ----------------- Stage Helpers ---------------- */
/* ------------------------------------------------ */

type OptionalKeys<T extends object> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type RequiredKeys<T extends object> = Exclude<keyof T, OptionalKeys<T>>;

/** Only keys guaranteed present from init() */
type SetFromInit<Init extends object> = Pick<Init, RequiredKeys<Init>>;

/* ------------------------------------------------ */
/* ------------------- Builder -------------------- */
/* ------------------------------------------------ */
export type ManyBuilder<Config extends object> = {
  defaults(values: Partial<Config>): ManyBuilder<Config>;
  build(): void;
};

type ManyInput<Config extends object> = Config extends { id: string } ? Flatten<Config | string> : Flatten<Config>;

export type Builder<Config extends object, Args extends readonly unknown[], Init extends Partial<Config>> = ((
  ...args: Args
) => Stage<Config, SetFromInit<Init>, DefaultHiddenKeys<Config>>) & {
  many(configs: ManyInput<Config>): ManyBuilder<Config>;
};

export function builder<
  Config extends object,
  Args extends readonly unknown[] = [],
  Init extends Partial<Config> = {}
>(cfg: {
  build: (cfg: Config) => void;
  init?: (...args: Args) => Init;
  opts?: BuilderCfg<Config>;
}): Builder<Config, Args, Init>;

export function builder<
  Config extends object,
  Args extends readonly unknown[] = [],
  Init extends Partial<Config> = {},
  Spec = void
>(cfg: {
  build: (cfg: Config, spec: Spec) => void;
  spec: Spec;
  init?: (...args: Args) => Init;
  opts?: BuilderCfg<Config>;
}): Builder<Config, Args, Init>;

export function builder<
  Config extends object,
  Args extends readonly unknown[] = [],
  Init extends Partial<Config> = {},
  Spec = void
>(cfg: {
  build: ((cfg: Config) => void) | ((cfg: Config, spec: Spec) => void);
  spec?: Spec;
  init?: (...args: Args) => Init;
  opts?: BuilderCfg<Config>;
}): Builder<Config, Args, Init> {
  const { init, opts } = cfg;
  const defaults = opts?.defaults ?? {};
  const set =
    opts?.set ??
    ((state, prop, value) => {
      state[prop] = value;
    });

  const callBuild = (c: Config) => {
    // If spec exists, call 2-arg build, else call 1-arg build
    if ("spec" in cfg) (cfg.build as (x: Config, s: Spec) => void)(c, cfg.spec as Spec);
    else (cfg.build as (x: Config) => void)(c);
  };

  const single = (...args: Args) => {
    const initProps = (init?.(...args) ?? {}) as Init;
    const state: Record<string, unknown> = { ...defaults, ...initProps };
    const hiddenKeys: readonly string[] = ["id", ...(opts?.hiddenKeys ?? [])];

    return createStageProxy<Config, SetFromInit<Init>, DefaultHiddenKeys<Config>>({
      hiddenKeys,
      extra: opts?.extra ?? {},
      onSet: (prop, value) => {
        set(state, prop, value);
      },
      onBuild: () => {
        callBuild(state as Config);
      }
    });
  };

  single.many = (cfgs: Array<Config | string>) => {
    type State = Record<string, unknown>;

    if (!(Array.isArray(cfgs) || isRecord(cfgs))) {
      throw new TypeError("many() expects an array or nested object of arrays");
    }

    // Normalize nested input -> flat array of values
    const normalized = flatten(cfgs);

    const items = normalized.map(c => {
      // If it's a string, treat it as {id: string}. This only *works* when Config has id.
      // Overloads prevent calling many() with strings when Config lacks id.
      const explicit: State = isString(c) ? { id: c } : (c as State);

      return {
        state: { ...defaults, ...explicit } as State,
        locked: new Set(Object.keys(explicit))
      };
    });

    const applyDefaults = (vals: Partial<Config>) => {
      for (const it of items) {
        for (const [k, v] of Object.entries(vals as Record<string, unknown>)) {
          if (k === "id") continue; // always ignore id
          if (it.locked.has(k)) continue; // don't clobber explicit per-item values
          set(it.state, k, v);
        }
      }
    };

    const api: ManyBuilder<Config> = {
      defaults(values) {
        applyDefaults(values);
        return api;
      },
      build() {
        for (const it of items) callBuild(it.state as Config);
      }
    };

    return api;
  };

  return single as unknown as Builder<Config, Args, Init>;
}
