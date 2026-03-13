import { describe, it, expect } from "vitest";
import { quality } from "@";
import { matchesSchema } from "@/api/util/tests/tests";
import schema from "@schemas/quality.schema.json" with { type: "json" };

describe("quality", () => {
  it("produces output that satisfies the quality schema", () => {
    expect(matchesSchema(schema, quality("ExampleQuality").value(100).color("#000229").build())).toBe(true);
  });
});
