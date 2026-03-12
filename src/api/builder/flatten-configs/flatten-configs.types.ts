import type { HasId } from "@";
/**
 * Defines the config shapes accepted by `builder.many(...)`.
 *
 * Callers can describe many configs in whatever structure is most ergonomic:
 *   - a flat list:              `["stone", "dirt", { id: "grass", color: "green" }]`
 *   - a keyed dictionary:       `{ dump: ["stone", "dirt"], patch: ["basalt"] }`
 *   - a recursive children tree: `{ id: "stone", children: ["cobblestone", "mossy"] }`
 *
 * All shapes are normalized to a flat list internally by flattenConfigs().
 */

/** ex. `["stone", "dirt", { id: "grass", color: "green" }]` */
type ManyFromList<Cfg extends HasId> = readonly (Partial<Cfg> | Cfg["id"])[];

/** ex. `{ dump: ["stone", "dirt"], patch: ["basalt"] }` */
interface ManyFromObject<Cfg extends HasId> {
  readonly [key: string]: ManyCfg<Cfg> | ManyFromList<Cfg>;
}

/** ex. `{ id: "stone", children: ["cobblestone", "mossy"] }` */
type ManyFromRecursiveObject<Cfg extends HasId> = Partial<Cfg> & {
  readonly children: readonly ManyCfg<Cfg>[];
};

/** The unified config type accepted by `builder.many(...)`. */
export type ManyCfg<Cfg extends HasId> = ManyFromList<Cfg> | ManyFromObject<Cfg> | ManyFromRecursiveObject<Cfg>;
