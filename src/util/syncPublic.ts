import fs from "fs";
import path from "path";
import process from "process";

/** Copy public folder contents to dist */
export function syncPublic(): void {
  const root = process.cwd();
  const src = path.join(root, "public");
  const dest = path.join(root, "dist", "Common");

  if (!fs.existsSync(src)) return;

  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}
