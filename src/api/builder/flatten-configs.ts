import type { HasId } from "../../index.js";

/**
 * Defines the config shapes accepted by `builder.many(...)`.
 *
 * - End users should be able to describe “many configs” in whatever structure is most ergonomic:
 *   - a flat list
 *   - a dictionary of groups
 *   - a recursive tree
 * - The builder will normalize these shapes into a flat list internally.
 */

/** A row item for an id-based builder. */
type Row<T extends HasId> = Partial<T>;

/** Flat list config for `builder<T>().many(...)`. */
type ManyFromList<T extends HasId> = readonly (Row<T> | T["id"])[];

/** Dictionary / grouping config for `builder<T>().many(...)`. */
interface ManyFromObject<T extends HasId> {
  readonly [key: string]: ManyCfg<T> | ManyFromList<T>;
}

/** Recursive object with children keys config for `builder<T>().many(...)`. */
type ManyFromRecursiveObject<T extends HasId> = Partial<Row<T>> & {
  readonly children: readonly ManyCfg<T>[];
};

/** The unified config type accepted by `builder<T>().many(...)`. */
type ManyCfg<T extends HasId> = ManyFromList<T> | ManyFromObject<T> | ManyFromRecursiveObject<T>;

/** Some object with string keys and unknown values. */
export type AnyObj = Record<string, unknown>;

/** Check if v is an object or non array object */
const isObj = (v: unknown): v is AnyObj => v !== null && typeof v === "object";
const isNonArrayObj = (v: unknown): v is AnyObj => isObj(v) && !Array.isArray(v);

/** Helper to omit keys from built object in array */
function omitKey(obj: AnyObj, key: string): AnyObj {
  const o: AnyObj = {};
  for (const [k, v] of Object.entries(obj)) if (k !== key) o[k] = v;
  return o;
}

/**
 * Produce flat list from a ManyCfg type config.
 * List items are either an id (string) or a row object (Record<string, unknown>)
 */
export function flattenConfigs(cfgs: unknown): Array<string | AnyObj> {
  const list: Array<string | AnyObj> = []; // Collect normalized items
  const seen = new WeakSet(); // Items that have been processed
  const push = (v: string | AnyObj) => list.push(v); // add normalized item to list

  // Root stop condition: already a “rows list”
  if (Array.isArray(cfgs) && cfgs.every(x => typeof x === "string" || isNonArrayObj(x))) {
    for (const cfg of cfgs) push(cfg);
    return list;
  }

  const visit = (cfgs: unknown): void => {
    if (typeof cfgs === "string") {
      push(cfgs);
      return;
    }
    if (Array.isArray(cfgs)) {
      for (const cfg of cfgs) visit(cfg);
      return;
    }
    if (!isObj(cfgs)) return;
    if (seen.has(cfgs)) return;

    seen.add(cfgs);

    const children = cfgs["children"];
    if (Array.isArray(children)) {
      push(omitKey(cfgs, "children"));
      for (const child of children) visit(child);
      return;
    }

    let hasArray = false;
    for (const cfg of Object.values(cfgs)) {
      if (Array.isArray(cfg)) {
        hasArray = true;
        visit(cfg);
      }
    }

    if (!hasArray) push(cfgs);
  };

  visit(cfgs);
  return list;
}
