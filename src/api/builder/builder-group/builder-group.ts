import { builder, isString, type BuilderCfg, type BuildersFromTypes, type GroupSpec, type HasId, type Type } from "#hg";

function toSpec<Config extends HasId>(t: Type<Config>): GroupSpec<Config> {
  return isString(t) ? ({ id: t, defaults: {} } as GroupSpec<Config>) : { id: t.id, defaults: t.defaults };
}

export function builderGroup<
  Config extends HasId,
  ExtraArgs extends unknown[] = [],
  InitKeys extends string = never,
  const Types extends readonly Type<Config>[] = readonly Type<Config>[]
>(types: Types, cfg: BuilderCfg<Config, ExtraArgs>): BuildersFromTypes<Config, ExtraArgs, InitKeys, Types> {
  return Object.fromEntries(
    types.map(t => {
      const spec = toSpec(t);
      return [
        spec.id.toLowerCase(),
        builder<Config, ExtraArgs, InitKeys>({
          ...cfg,
          defaults: { ...(cfg.defaults ?? {}), ...spec.defaults }
        })
      ];
    })
  ) as BuildersFromTypes<Config, ExtraArgs, InitKeys, Types>;
}
