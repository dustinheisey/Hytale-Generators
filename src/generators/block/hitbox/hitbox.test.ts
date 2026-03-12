import { describe, it, expect } from "vitest";
import { hitbox } from "@";
import { matchesSchema } from "@/api/util/tests/tests";
import schema from "@schemas/hitbox.schema.json" with { type: "json" };

describe("hitbox", () => {
  it("produces output that satisfies the hitbox schema", () => {
    expect(matchesSchema(schema, hitbox("hitbox").min(0).max({ x: 0, y: 3, z: 2 }).build())).toBe(true);
  });
});
