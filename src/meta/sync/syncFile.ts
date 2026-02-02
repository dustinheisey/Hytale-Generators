import * as fs from "node:fs";
import { syncDir } from "@meta";

/**
 * Ensures a file exists on disk.
 *
 * If the file does not exist, it is created with empty contents. If it already
 * exists, this does nothing.
 *
 * Note: This function does not create parent directories. Pair it with `syncDir`
 * when the directory may not exist.
 *
 * @param file - Full or relative path to the file to create if missing.
 *
 * @example
 * syncDir("locales/en/messages.properties");
 * createFile("locales/en/messages.properties");
 */
export function createFile(file: string) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "");
}

export function syncFile(file: string) {
  syncDir(file);
  createFile(file);
}
