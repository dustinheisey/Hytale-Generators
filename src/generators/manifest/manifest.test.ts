import { describe, it, expect } from "vitest";
import { manifest } from "@";
import { matchesSchema } from "@/api/util/tests/tests";
import schema from "@schemas/manifest.schema.json" with { type: "json" };

describe("manifest", () => {
  it("produces output that satisfies the manifest schema", () => {
    expect(
      matchesSchema(
        schema,
        manifest()
          .main("org.example.ExamplePlugin")
          .name("Example")
          .authors([{ name: "test" }])
          .group("test")
          .serverVersion("1.0.0")
          .version("1.0.0")
          .description("test")
          .website("https://example.com")
          .build()
      )
    ).toBe(true);
  });
});
