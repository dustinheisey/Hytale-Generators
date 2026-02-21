import fs from "fs";
import path from "path";
import process from "process";
import { global } from "../index.js";

/** Copy public folder contents to dist */
export const syncPublic = (): void => {
  const root = process.cwd();
  const src = path.join(root, "public");
  const dest = path.join(root, global().outDir, "Common");

  if (!fs.existsSync(src)) return;

  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
};
