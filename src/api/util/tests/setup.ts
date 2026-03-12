import { setGlobals } from "@";
import { vi } from "vitest";

vi.mock("node:fs", async importOriginal => {
  const actual = await importOriginal<typeof import("node:fs")>();
  return {
    ...actual,
    writeFile: vi.fn(),
    writeFileSync: vi.fn(),
    readFileSync: vi.fn((path: unknown, ...args: unknown[]) => {
      console.log("loaded", path, ...args);
      if (typeof path === "string" && path.endsWith(".lang")) return "";
      return (actual.readFileSync as (...a: unknown[]) => unknown)(path, ...args);
    }),
    mkdirSync: vi.fn(),
    existsSync: vi.fn(() => true)
  };
});

setGlobals({ modId: "test" });
