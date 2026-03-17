import type { Builder, BuilderCfg, HasId } from "../../index.js";
import { builder, isString } from "../../index.js";

type InitOf<C extends HasId> = Partial<C> & Pick<C, "id">;

export type Type<Config extends HasId> = Config["id"] | { id: Config["id"]; defaults: Partial<Config> };

export type GroupSpec<Config extends HasId> = { id: Config["id"]; defaults: Partial<Config> };

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
    map.set(s.id.toLowerCase(), t); // override/insert
  }

  return [...map.values()];
}

export function makeGroup<
  Config extends HasId,
  Args extends unknown[] = [Config["id"]],
  Init extends InitOf<Config> = InitOf<Config>
>() {
  return function defineGroup(cfg: {
    build: (cfg: Config, spec: GroupSpec<Config>) => void;
    types: readonly Type<Config>[];
    init?: (...args: Args) => Init;
    opts?: BuilderCfg<Config>;
    groupDefaults?: Partial<Config>;
  }) {
    const { build, types: baseTypes, init, opts, groupDefaults } = cfg;

    // Users call this returned function to extend/override types
    return function material(overrideTypes: readonly Type<Config>[] = []): Record<string, Builder<Config, Args, Init>> {
      const finalTypes = overrideTypes.length ? mergeTypesById(baseTypes, overrideTypes) : [...baseTypes];

      const out: Record<string, Builder<Config, Args, Init>> = {};

      for (const t of finalTypes) {
        const spec = toSpec(t);
        const key = spec.id.toLowerCase();

        const defaults: Partial<Config> = {
          ...(groupDefaults ?? {}),
          ...spec.defaults
        };

        out[key] = builder<Config, Args, Init, GroupSpec<Config>>({
          build,
          spec,
          init,
          opts: { ...(opts ?? {}), defaults }
        });
      }

      return out;
    };
  };
}
