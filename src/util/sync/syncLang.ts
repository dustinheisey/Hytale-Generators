import * as fs from "node:fs";
import { syncFile } from "@sync";

type LangEntry = { key: string; value: string };

/**
 * Appends a `key=value` entry (plus a trailing newline) to a language/properties file.
 *
 * This does not deduplicate keys or update existing values—it always appends.
 * If you call this repeatedly with the same key, the file will contain multiple
 * entries for that key.
 *
 * @param file - Path to the target language/properties file.
 * @param key - The key to write.
 * @param value - The value to write.
 *
 * @example
 * appendLang("locales/en/messages.properties", "app.title", "My App");
 */
export function appendLang(file: string, key: string, value: string) {
  fs.appendFileSync(file, `${key}=${value}\n`);
}

/**
 * Ensures a language/properties file exists and appends required entries.
 *
 * Creates parent directories (recursively) and the file (if missing), then appends
 * the provided `name` entry and optionally a `description` entry.
 *
 * Like `appendLang`, this function always appends and does not replace existing keys.
 *
 * @param file - Path to the target language/properties file.
 * @param name - Required entry to append (commonly a display name).
 * @param description - Optional entry to append (commonly a longer description).
 *
 * @example
 * syncLang(
 *   "locales/en/messages.properties",
 *   { key: "app.name", value: "My App" },
 *   { key: "app.description", value: "A delightful little program." }
 * );
 */
export function syncLang(
  file: string,
  name: LangEntry,
  description?: LangEntry,
) {
  syncFile(file);
  appendLang(file, name.key, name.value);
  if (description) appendLang(file, description.key, description.value);
}
