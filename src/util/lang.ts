import { global, syncFile } from "hytale-generators";
import fs from "node:fs";

export interface LangConfig {
  key: string;
  value: string;
}

/**
 *
 * @param entries - list of key value pairs to add to server.lang
 */
export function lang(entries: LangConfig[]) {
  // Absolute path to the lang file we want to modify
  const file = `${global().outDir}/Server/Languages/en-US/server.lang`;

  // Ensure the file (and its parent folders) exist before we try to read/write it
  syncFile(file);

  // Read the file as text and split into individual lines
  const raw = fs.readFileSync(file, "utf8");
  const lines = raw.length ? raw.split(/\r?\n/) : [];

  // Convert the incoming entries into a Map for fast lookups by key
  // If the same key appears multiple times, the last one wins.
  const updates = new Map<string, string>();
  for (const { key, value } of entries) {
    updates.set(key, value);
  }

  // Track which update keys we actually found in the existing file.
  // appends ONLY the missing keys later.
  const foundKeys = new Set<string>();

  // Walk through every existing line:
  // - If it's a "key=value" line AND the key exists in updates, replace the value.
  // - Otherwise, leave the line unchanged (preserves comments, blank lines, etc.).
  const outLines = lines.map(line => {
    // Find the first '=' only (values are allowed to contain '=')
    const eq = line.indexOf("=");
    if (eq === -1) return line; // not a key/value line; keep as-is

    // Everything before '=' is the key
    const key = line.slice(0, eq).trim();
    if (!key) return line; // malformed line like "=value"; keep as-is

    // If we have an update for this key, replace this line's value
    const next = updates.get(key);
    if (next !== undefined) {
      foundKeys.add(key);
      return `${key}=${next}`;
    }
    return line;
  });

  // Append any update keys that did not exist in the original file.
  // These become new "key=value" lines at the end of the file.
  for (const [key, value] of updates) {
    if (!foundKeys.has(key)) {
      outLines.push(`${key}=${value}`);
    }
  }

  // Join back into a single string.
  const finalText = outLines.filter((_, i) => !(i === outLines.length - 1 && outLines[i] === "")).join("\n") + "\n";

  // Write the updated file back to disk
  fs.writeFileSync(file, finalText, "utf8");
}
