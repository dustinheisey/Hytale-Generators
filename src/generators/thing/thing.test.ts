import { describe, it, expect } from "vitest";
import { thing } from "@";
import { matchesSchema } from "@/api/util/tests/tests";
import schema from "@schemas/item.schema.json" with { type: "json" };

describe("thing", () => {
  it("produces output that satisfies the thing schema", () => {
    expect(matchesSchema(schema, thing("hello").build())).toBe(true);
  });
});
