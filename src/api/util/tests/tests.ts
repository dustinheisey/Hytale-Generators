import Ajv from "ajv";
import addFormats from "ajv-formats";
import { expect } from "vitest";

const ajv = new Ajv();
(addFormats as (ajv: Ajv) => void)(ajv);

export function matchesSchema(schema: Record<string, unknown>, data: unknown): boolean {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    expect.fail(`Schema validation failed:\n${JSON.stringify(validate.errors, null, 2)}`);
  }
  return valid;
}
