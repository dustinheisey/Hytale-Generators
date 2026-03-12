import {
  createStageProxy,
  flatten,
  globals,
  isRecord,
  isString,
  type AlwaysSet,
  type AnyObj,
  type Builder,
  type DefaultHiddenKeys,
  type Flatten,
  type GlobalsCfg,
  type ManyBuilder,
  type ManyInput
} from "#hg";

type BuilderCfg<Config extends object, ExtraArgs extends unknown[], Spec> = {
  build: (cfg: Config, globals: GlobalsCfg, spec?: Spec) => Record<string, unknown>;
  spec?: Spec;
  init?: (...args: ExtraArgs) => Omit<Partial<Config>, "id" | "type">;
  defaults?: Partial<Config>;
  hiddenKeys?: readonly (keyof Config & string)[];
  setters?: Record<string, (...args: unknown[]) => void>;
};

// Shorthand overload
export function builder<Config extends object, ExtraArgs extends unknown[] = [], InitKeys extends string = never>(
  build: (cfg: Config, globals: GlobalsCfg) => Record<string, unknown>,
  defaults?: Partial<Config>
): Builder<Config, ExtraArgs, InitKeys>;

// Full config overload
export function builder<
  Config extends object,
  ExtraArgs extends unknown[] = [],
  InitKeys extends string = never,
  Spec = void
>(cfg: BuilderCfg<Config, ExtraArgs, Spec>): Builder<Config, ExtraArgs, InitKeys>;

// Implementation
export function builder<
  Config extends object,
  ExtraArgs extends unknown[] = [],
  InitKeys extends string = never,
  Spec = void
>(
  cfgOrBuild: BuilderCfg<Config, ExtraArgs, Spec> | ((cfg: Config, globals: GlobalsCfg) => Record<string, unknown>),
  defaults?: Partial<Config>
): Builder<Config, ExtraArgs, InitKeys> {
  const cfg: BuilderCfg<Config, ExtraArgs, Spec> =
    typeof cfgOrBuild === "function"
      ? { build: cfgOrBuild, ...(defaults !== undefined ? { defaults } : {}) }
      : cfgOrBuild;

  const { init, defaults: cfgDefaults = {}, hiddenKeys = [], setters = {} } = cfg;
  const isIdBased = (cfg as unknown as { id?: unknown }).id !== false;

  const callBuild = (c: Config): Record<string, unknown> => {
    return cfg.build(c, globals(), cfg.spec as Spec);
  };

  const single = (...args: unknown[]) => {
    const id = isIdBased ? (args[0] as string) : undefined;
    const extraArgs = (isIdBased ? args.slice(1) : args) as ExtraArgs;

    const initResult = init?.(...extraArgs) ?? {};
    const initKeys = Object.keys(initResult) as InitKeys[];

    const state: Record<string, unknown> = {
      ...cfgDefaults,
      ...(id !== undefined ? { id } : {}),
      ...initResult
    };

    return createStageProxy<Config, AlwaysSet<Config, InitKeys>, DefaultHiddenKeys<Config, InitKeys>>({
      hiddenKeys: [...(id !== undefined ? ["id"] : []), ...initKeys, ...hiddenKeys],
      setters,
      onSet: (prop, value) => {
        state[prop] = value;
      },
      onBuild: () => {
        return callBuild(state as Config);
      }
    });
  };

  single.many = (cfgs: ManyInput<Config>) => {
    if (!(Array.isArray(cfgs) || isRecord(cfgs))) {
      throw new TypeError("many() expects an array or nested object of arrays");
    }

    const normalized = flatten(cfgs as Flatten<Config | string>);

    const items = normalized.map(c => {
      const explicit: AnyObj = isString(c) ? { id: c } : (c as AnyObj);
      return {
        state: {
          ...cfgDefaults,
          ...explicit
        } as AnyObj,
        locked: new Set(Object.keys(explicit))
      };
    });

    const applyDefaults = (vals: Partial<Config>) => {
      for (const it of items) {
        for (const [k, v] of Object.entries(vals as AnyObj)) {
          if (k === "id") continue;
          if (it.locked.has(k)) continue;
          it.state[k] = v;
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

  return single as unknown as Builder<Config, ExtraArgs, InitKeys>;
}
