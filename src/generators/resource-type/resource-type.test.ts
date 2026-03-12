import { describe, it, expect } from "vitest";
import { resourceType } from "@";
import { matchesSchema } from "@/api/util/tests/tests";
import schema from "@schemas/resource-type.schema.json" with { type: "json" };

describe("resource-type", () => {
  it("produces output that satisfies the resource-type schema", () => {
    expect(matchesSchema(schema, resourceType("resource-type").icon("Rocks").build())).toBe(true);
  });
});
