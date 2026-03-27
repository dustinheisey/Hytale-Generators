import { isString, json, lang, texture, withThing, type GlobalsCfg, type ThingCfg } from "@";

const resolveId = (group: string | undefined, id: string) => (group ? `${group}_${id}` : id);

const resolvePath = (base: string, out: string | { root: string } | undefined, id: string) =>
  isString(out) ? `${base}/${out}` : `${base}${out?.root ?? ""}/${id}`;

const resolveName = (id: string, name?: string, baseName?: string, group?: string) =>
  name ?? `${id}${baseName ?? (group ? ` ${group}` : "")}`;

const resolveMask = (group: string | undefined, mask?: string, baseMask?: string) =>
  group ? (mask ?? `${group}s/${group}${baseMask ? `_${baseMask}` : ""}`) : undefined;

export const thing = (cfg: ThingCfg, g: GlobalsCfg, fragments?: Record<string, unknown>[]): Record<string, unknown> => {
  const {
    modId,
    paths: { item }
  } = g;
  const id = resolveId(cfg.group, cfg.id);
  const name = resolveName(cfg.id, cfg.name, cfg.baseName, cfg.group);
  const mask = resolveMask(cfg.group, cfg.mask, cfg.baseMask);
  const jsonOut = resolvePath(item.json, cfg.out?.json, id);
  const textureOut = resolvePath("", cfg.out?.texture, id);

  lang(`${item.langRoot}.${modId}.${id}`, name, cfg.description);
  if (mask) texture(cfg.color, mask, textureOut);
  return json(jsonOut, [withThing(cfg), ...(fragments ?? [])]);
};

// import type { FilterOf, HasFilter } from "@";

// export function matchesFilter<Cfg extends HasFilter<string>>(cfg: Cfg, filter: FilterOf<Cfg>): boolean {
//   if (cfg.include) {
//     const includes = Array.isArray(cfg.include) ? cfg.include : [cfg.include];
//     return includes.some(f => filter.includes(f));
//   }

//   if (cfg.exclude) {
//     const excludes = Array.isArray(cfg.exclude) ? cfg.exclude : [cfg.exclude];
//     return !excludes.some(f => filter.includes(f));
//   }

//   return true;
// }

// export function filter<Cfg extends HasFilter<string>>(cfgs: Cfg[], f: FilterOf<Cfg>): Cfg[] {
//   return cfgs.filter(cfg => matchesFilter(cfg, f));
// }

