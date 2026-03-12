import { describe, it, expect } from "vitest";
import { matchesSchema } from "@/api/util/tests/tests";
import schema from "@schemas/word-list.schema.json" with { type: "json" };
import { wordList } from "./word-list";

describe("word-list", () => {
  it("produces output that satisfies the word-list schema", () => {
    expect(matchesSchema(schema, wordList("Runes").words(["feyun=Feyun", "urox=Urox", "thuris=Thuris"]).build())).toBe(
      true
    );
  });
});
