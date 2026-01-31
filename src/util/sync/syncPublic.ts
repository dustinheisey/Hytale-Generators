import fs from "node:fs";
import path from "node:path";
import process from "node:process";

export function syncPublic(): void {
  const root = process.cwd();
  const src = path.join(root, "public");
  const dest = path.join(root, "dist", "Common");

  if (!fs.existsSync(src)) return;

  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}
