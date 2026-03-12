import { globals, syncFile, toPascal } from "@";
import * as fs from "fs";

export function write(path: string, data: object): Record<string, unknown> {
  const file = `${globals().outDir}/${path}.json`;
  syncFile(file);
  const transformed = toPascal(data) as Record<string, unknown>;
  fs.writeFile(file, JSON.stringify(transformed, null, 2), err => {
    if (err) console.error("Error writing file:", err);
  });
  return transformed;
}

export function json(path: string, data: object | object[]): Record<string, unknown> {
  const arr = Array.isArray(data) ? data : [data];
  return write(
    path,
    arr.reduce<Record<string, unknown>>((acc, obj) => ({ ...acc, ...(obj as Record<string, unknown>) }), {})
  );
}
