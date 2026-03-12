import { describe, it, expect } from "vitest";
import { blockSet } from "@";
import { matchesSchema } from "@/api/util/tests/tests";
import schema from "@schemas/block-set.schema.json" with { type: "json" };

describe("block-set", () => {
  it("produces output that satisfies the block-set schema", () => {
    expect(
      matchesSchema(
        schema,
        blockSet("block-set")
          .parent("test")
          .tags("type:test")
          .includeAll(false)
          .includeBlockGroups([""])
          .excludeBlockGroups([""])
          .includeBlockTypes([""])
          .excludeBlockTypes([""])
          .includeHitboxTypes([""])
          .excludeHitboxTypes([""])
          .includeCategories([[""]])
          .excludeCategories([[""]])
          .build()
      )
    ).toBe(true);
  });
});
