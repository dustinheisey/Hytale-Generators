import { describe, it, expect } from "vitest";
import { barterShop } from "@";
import { matchesSchema } from "@/api/util/tests/tests";
import schema from "@schemas/barter-shop.schema.json" with { type: "json" };

describe("barter-shop", () => {
  it("produces output that satisfies the barter-shop schema", () => {
    expect(
      matchesSchema(
        schema,
        barterShop("barter-shop")
          .restock([10, 5])
          .fixedTrades([{ input: "2x Ingredient_Test", output: "Ingredient_Test_2", stock: 20 }])
          .tradePools([
            {
              slots: 3,
              trades: [
                { input: "23x Ingredient_Test", output: "Ingredient_Test_3", stock: [2], weight: 15 },
                { input: "5x Ingredient_Test", output: "Ingredient_Test_3", stock: [7], weight: 20 },
                { input: "6x Ingredient_Test", output: "Ingredient_Test_3", stock: [8], weight: 10 },
                { input: "19x Ingredient_Test", output: "Ingredient_Test_3", stock: [2], weight: 50 },
                { input: "3x Ingredient_Test", output: "Ingredient_Test_3", stock: [20], weight: 5 }
              ]
            }
          ])
          .build()
      )
    ).toBe(true);
  });
});
