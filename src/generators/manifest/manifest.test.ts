import { describe, it, expect } from "vitest";
import { compileSchema, validateSchema } from "../../test/utils.js";
import schema from "#schemas/Manifest" with { type: "json" };
import { manifest } from "./manifest.js";

const validate = compileSchema(schema);

describe("manifest", () => {
  it("produces output that satisfies the manifest schema", () => {
    const data = manifest()
      .main("org.example.ExamplePlugin")
      .name("Example")
      .authors([{ name: "test" }])
      .description("test")
      .group("test")
      .serverVersion("1.0.0")
      .version("1.0.0")
      .website("https://example.com")
      .build();

    expect(validateSchema(validate, data)).toBe(true);
  });
});
