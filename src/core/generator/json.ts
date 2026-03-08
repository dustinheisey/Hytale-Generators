import {
  fragments,
  global,
  resolvePath,
  syncFile,
  toPascal,
  type CompatibleFragments,
  type Fragment,
  type HasId,
  type HasType
} from "#hg/index";
import * as fs from "fs";

function write(path: string, data: object) {
  const file = `${global().outDir}/${path}.json`;
  syncFile(file);
  fs.writeFile(file, JSON.stringify(toPascal(data), null, 2), err => {
    if (err) console.error("Error writing file:", err);
  });
}

export function json(path: string, data: object): void;
export function json<Cfg extends HasId & HasType>(
  cfg: Cfg,
  pick: (f: CompatibleFragments<Cfg>) => Fragment<Cfg>[]
): void;
export function json<Cfg extends HasId & HasType>(
  cfgOrPath: Cfg | string,
  pickOrData: ((f: CompatibleFragments<Cfg>) => Fragment<Cfg>[]) | object
) {
  if (typeof cfgOrPath === "string") {
    write(cfgOrPath, pickOrData as object);
    return;
  }

  const f = (pickOrData as (f: CompatibleFragments<Cfg>) => Fragment<Cfg>[])(fragments as CompatibleFragments<Cfg>);

  const data = Object.assign({}, ...f.map(f => f(cfgOrPath as never))) as object;
  write(resolvePath(cfgOrPath, global()), data);
}
