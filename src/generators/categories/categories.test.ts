import { describe, it, expect } from "vitest";
import { categories } from "@";
import { matchesSchema } from "@/api/util/tests/tests";
import schema from "@schemas/item-category.schema.json" with { type: "json" };

describe("categories", () => {
  it("produces output that satisfies the item-category schema", () => {
    expect(
      matchesSchema(
        schema,
        categories()
          .children([{ id: "test", icon: "test2", name: "Testing" }, "hello"])
          .order(25)
          .iconGenerated(false)
          .build()
      )
    ).toBe(true);
  });
});
