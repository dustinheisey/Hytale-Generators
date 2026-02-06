import * as fs from "fs";
import * as path from "path";

/**
 * Ensures the directory that will contain the given file path exists.
 *
 * This is a small helper for “write this file somewhere, even if the folders
 * don’t exist yet” workflows. It derives the parent directory via `path.dirname`
 * and creates it recursively if missing.
 * @param file - Full or relative path to the file whose parent directory should exist.
 * @example
 * syncDir("locales/en/messages.properties"); // creates "locales/en" if needed
 */
export function syncDir(file: string) {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
