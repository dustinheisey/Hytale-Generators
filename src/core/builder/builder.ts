import { flatten, isRecord, isString, type Flatten } from "#hg/index";
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

type SetFromInit<Init extends object> = Pick<Init, RequiredKeys<Init>>;

/* ------------------------------------------------ */
/* ------------------- Builder -------------------- */
/* ------------------------------------------------ */

export type ManyBuilder<Config extends object> = {
  defaults(values: Partial<Config>): ManyBuilder<Config>;
  build(): void;
};

type ManyInput<Config extends object, Init extends Record<string, unknown>> = Config extends { id: string }
  ? Flatten<(Omit<Config, keyof Init> & Partial<Pick<Config, keyof Init & keyof Config>>) | string>
  : Flatten<Omit<Config, keyof Init> & Partial<Pick<Config, keyof Init & keyof Config>>>;

export type Builder<Config extends object, Args extends readonly unknown[], Init extends Record<string, unknown>> = ((
  ...args: Args
) => Stage<Config, SetFromInit<Init>, DefaultHiddenKeys<Config>>) & {
  many(configs: ManyInput<Config, Init>): ManyBuilder<Config>;
};

export function builder<
  Config extends object,
  Args extends readonly unknown[] = [],
  Init extends Record<string, unknown> = {}
>(cfg: {
  build: (cfg: Config) => void;
  init?: (...args: Args) => Init;
  opts?: BuilderCfg<Config>;
}): Builder<Config, Args, Init>;

export function builder<
  Config extends object,
  Args extends readonly unknown[] = [],
  Init extends Record<string, unknown> = {},
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
  Init extends Record<string, unknown> = {},
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
    if ("spec" in cfg) (cfg.build as (x: Config, s: Spec) => void)(c, cfg.spec);
    else (cfg.build as (x: Config) => void)(c);
  };

  const single = (...args: Args) => {
    const initProps = (init?.(...args) ?? {}) as Init;
    const state: Record<string, unknown> = { ...defaults, ...initProps };
    const hiddenSet = new Set<string>(["id", ...(opts?.hiddenKeys ?? [])]);

    return createStageProxy<Config, SetFromInit<Init>, DefaultHiddenKeys<Config>>({
      hiddenKeys: [...hiddenSet],
      extra: opts?.extra ?? {},
      onSet: (prop, value) => {
        set(state, prop, value);
      },
      onBuild: () => {
        callBuild(state as Config);
      }
    });
  };

  single.many = (cfgs: ManyInput<Config, Init>) => {
    type State = Record<string, unknown>;

    if (!(Array.isArray(cfgs) || isRecord(cfgs))) {
      throw new TypeError("many() expects an array or nested object of arrays");
    }

    // Call init with no args to get static defaults (e.g. type, group)
    const initDefaults = (init?.(...([] as unknown as Args)) ?? {}) as Partial<Config>;

    const normalized = flatten(cfgs as Flatten<Config | string>);

    const items = normalized.map(c => {
      const explicit: State = isString(c) ? { id: c } : (c as State);
      return {
        state: { ...defaults, ...initDefaults, ...explicit } as State,
        locked: new Set(Object.keys(explicit))
      };
    });

    const applyDefaults = (vals: Partial<Config>) => {
      for (const it of items) {
        for (const [k, v] of Object.entries(vals as Record<string, unknown>)) {
          if (k === "id") continue;
          if (it.locked.has(k)) continue;
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
