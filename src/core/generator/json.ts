import { global, syncFile, toPascal, type HasId } from "#hg/index";
import * as fs from "fs";

export function json(path: string, data: object) {
  const file = `${global().outDir}/${path}.json`;
  syncFile(file);
  fs.writeFile(file, JSON.stringify(toPascal(data), null, 2), err => {
    if (err) console.error("Error writing file:", err);
  });
}

export function simpleJson<Cfg extends HasId>(path: string, cfg: Cfg, fragments: ((cfg: Cfg) => object)[]) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = Object.assign({}, ...fragments.map(f => f(cfg)));
  const file = `${global().outDir}/${path}.json`;
  syncFile(file);
  fs.writeFile(file, JSON.stringify(toPascal(data), null, 2), err => {
    if (err) console.error("Error writing file:", err);
  });
}
