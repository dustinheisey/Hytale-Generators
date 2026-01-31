import * as fs from "node:fs";
import { syncFile } from "@sync";

/**
 * Writes an object to a JSON file asynchronously (pretty-printed with 2 spaces).
 *
 * The write happens via `fs.writeFile` and logs success or errors to the console.
 * Note: This function writes to the exact `file` path you provide; it does not
 * automatically append “.json” even though the log message includes `${file}.json`.
 *
 * @param file - Destination file path
 * @param data - Plain object to serialize as JSON.
 *
 * @example
 * writeJson("dist/config.json", { env: "prod", debug: false });
 */
export function writeJson(file: string, data: object) {
  fs.writeFile(
    file,
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log(`${file}.json written successfully`);
    },
  );
}

/**
 * Ensures a JSON file can be written, then writes it.
 *
 * Creates parent directories (recursively) and the file (if missing), then writes
 * the JSON contents using `writeJson`.
 *
 * @param file - Destination file path (should usually end with `.json`).
 * @param data - Plain object to serialize as JSON.
 *
 * @example
 * syncJson("dist/config.json", { env: "prod" });
 */
export function syncJson(file: string, data: object) {
  syncFile(`dist/${file}.json`);
  writeJson(`dist/${file}.json`, data);
}
