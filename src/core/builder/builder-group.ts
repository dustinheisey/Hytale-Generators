import type { Builder, BuilderCfg, HasId } from "#hg/index";
import { builder, isString } from "#hg/index";

type InitOf<C extends HasId> = Partial<C> & Pick<C, "id">;

export type Type<Config extends HasId> = Config["id"] | { id: Config["id"]; defaults: Partial<Config> };

export type GroupSpec<Config extends HasId> = {
  id: Config["id"];
  defaults: Partial<Config>;
};

type TypeId<T> = T extends string ? T : T extends { id: infer I } ? I : never;

type BuildersFromTypes<
  Config extends HasId,
  Args extends unknown[],
  Init extends InitOf<Config>,
  Types extends readonly Type<Config>[]
> = {
  [T in Types[number] as Lowercase<TypeId<T> & string>]: Builder<Config, Args, Init>;
};

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

export function makeGroup<
  Config extends HasId,
  Args extends unknown[] = [Config["id"]],
  Init extends InitOf<Config> = InitOf<Config>
>() {
  return function defineGroup<const BaseTypes extends readonly Type<Config>[]>(cfg: {
    build: (cfg: Config, spec: GroupSpec<Config>) => void;
    types: BaseTypes;
    init?: (...args: Args) => Init;
    opts?: BuilderCfg<Config>;
    groupDefaults?: Partial<Config>;
  }) {
    const { build, types: baseTypes, init, opts, groupDefaults } = cfg;

    function material(): BuildersFromTypes<Config, Args, Init, BaseTypes>;
    function material<const OverrideTypes extends readonly Type<Config>[]>(
      overrideTypes: OverrideTypes
    ): BuildersFromTypes<Config, Args, Init, BaseTypes> & BuildersFromTypes<Config, Args, Init, OverrideTypes>;
    function material<const OverrideTypes extends readonly Type<Config>[]>(
      overrideTypes: OverrideTypes = [] as unknown as OverrideTypes
    ) {
      const finalTypes = overrideTypes.length ? mergeTypesById(baseTypes, overrideTypes) : [...baseTypes];

      const out: Record<string, Builder<Config, Args, Init>> = {};

      for (const t of finalTypes) {
        const spec = toSpec(t);
        const key = spec.id.toLowerCase();

        const defaults: Partial<Config> = {
          ...(groupDefaults ?? {}),
          ...spec.defaults
        };

        const common = {
          build,
          spec,
          opts: { ...(opts ?? {}), defaults }
        };

        out[key] = init
          ? builder<Config, Args, Init, GroupSpec<Config>>({
              ...common,
              init
            })
          : builder<Config, Args, Init, GroupSpec<Config>>(common);
      }

      return out;
    }

    return material;
  };
}
