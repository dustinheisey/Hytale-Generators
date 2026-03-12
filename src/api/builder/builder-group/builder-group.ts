import {
  builder,
  isString,
  type Builder,
  type BuildersFromTypes,
  type GlobalsCfg,
  type GroupSpec,
  type HasId,
  type Type
} from "#hg";

function toSpec<Config extends HasId>(t: Type<Config>): GroupSpec<Config> {
  return isString(t) ? ({ id: t, defaults: {} } as GroupSpec<Config>) : { id: t.id, defaults: t.defaults };
}

function mergeTypesById<Config extends HasId>(
  base: readonly Type<Config>[],
  overrides: readonly Type<Config>[]
): Type<Config>[] {
  const map = new Map<string, Type<Config>>();

  for (const t of base) {
    const s = toSpec(t);
    map.set(s.id.toLowerCase(), t);
  }

  for (const t of overrides) {
    const s = toSpec(t);
    map.set(s.id.toLowerCase(), t);
  }

  return [...map.values()];
}

export function makeGroup<Config extends HasId, ExtraArgs extends unknown[] = [], InitKeys extends string = never>() {
  return function defineGroup<const BaseTypes extends readonly Type<Config>[]>(cfg: {
    build: (cfg: Config, globals: GlobalsCfg, spec?: GroupSpec<Config>) => Record<string, unknown>;
    types: BaseTypes;
    init?: (...args: ExtraArgs) => Omit<Partial<Config>, "id" | "type">;
    defaults?: Partial<Config>;
    hiddenKeys?: readonly (keyof Config & string)[];
    setters?: Record<string, (...args: unknown[]) => void>;
  }) {
    const { build, types: baseTypes } = cfg;

    function material(): BuildersFromTypes<Config, ExtraArgs, InitKeys, BaseTypes>;
    function material<const OverrideTypes extends readonly Type<Config>[]>(
      overrideTypes: OverrideTypes
    ): BuildersFromTypes<Config, ExtraArgs, InitKeys, BaseTypes> &
      BuildersFromTypes<Config, ExtraArgs, InitKeys, OverrideTypes>;
    function material<const OverrideTypes extends readonly Type<Config>[]>(
      overrideTypes: OverrideTypes = [] as unknown as OverrideTypes
    ) {
      const finalTypes = overrideTypes.length ? mergeTypesById(baseTypes, overrideTypes) : [...baseTypes];
      const out: Record<string, Builder<Config, ExtraArgs, InitKeys>> = {};

      for (const t of finalTypes) {
        const spec = toSpec(t);
        const key = spec.id.toLowerCase();

        out[key] = builder<Config, ExtraArgs, InitKeys, GroupSpec<Config>>({
          build,
          spec,
          ...(cfg.init ? { init: cfg.init } : {}),
          ...(cfg.hiddenKeys ? { hiddenKeys: cfg.hiddenKeys } : {}),
          ...(cfg.setters ? { setters: cfg.setters } : {}),
          defaults: { ...(cfg.defaults ?? {}), ...spec.defaults }
        });
      }

      return out;
    }

    return material;
  };
}
