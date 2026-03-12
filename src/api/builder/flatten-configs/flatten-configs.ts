import { isObj, isString, type AnyObj } from "@hg";

/** Helper to omit keys from built object in array */
function omitKey(obj: AnyObj, key: string): AnyObj {
  const o: AnyObj = {};
  for (const [k, v] of Object.entries(obj)) if (k !== key) o[k] = v;
  return o;
}

/**
 * Normalizes any ManyCfg shape into a flat list of strings or row objects.
 * Handles flat arrays, keyed dictionaries, and recursive children trees.
 */
export function flattenConfigs(cfgs: unknown): Array<string | AnyObj> {
  const list: Array<string | AnyObj> = [];
  const seen = new WeakSet();

  const visit = (node: unknown): void => {
    if (isString(node)) {
      list.push(node);
      return;
    }
    if (Array.isArray(node)) {
      for (const item of node) visit(item);
      return;
    }
    if (!isObj(node) || seen.has(node)) return;

    seen.add(node);

    const children = node["children"];
    if (Array.isArray(children)) {
      list.push(omitKey(node, "children"));
      for (const child of children) visit(child);
      return;
    }

    let hasArray = false;
    for (const val of Object.values(node)) {
      if (Array.isArray(val)) {
        hasArray = true;
        visit(val);
      }
    }

    if (!hasArray) list.push(node);
  };

  visit(cfgs);
  return list;
}
