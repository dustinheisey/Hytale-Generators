import Ajv from "ajv";
import addFormats from "ajv-formats";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "path";
import { expect } from "vitest";

const schemasDir = new URL("../../../schemas", import.meta.url).pathname;

const ajv = new Ajv({ $data: true });
(addFormats as (ajv: Ajv) => void)(ajv);

ajv.addKeyword("hytale");
ajv.addKeyword("markdownDescription");
ajv.addKeyword("hytaleParent");
ajv.addKeyword("hytaleCommonAsset");
ajv.addKeyword("hytaleSchemaTypeField");
ajv.addKeyword("enumDescriptions");
ajv.addKeyword("markdownEnumDescriptions");
ajv.addKeyword("hytaleAssetRef");

for (const file of readdirSync(schemasDir).filter(f => f.endsWith(".json"))) {
  const schema = JSON.parse(readFileSync(join(schemasDir, file), "utf-8")) as Record<string, unknown>;
  ajv.addSchema(schema);
}

export function matchesSchema(schema: Record<string, unknown>, data: unknown): boolean {
  const id = schema["$id"] as string | undefined;
  const validate = (id ? ajv.getSchema(id) : undefined) ?? ajv.compile(schema);

  const valid = validate(data);
  if (!valid) {
    const errors = validate.errors
      ?.map(e => {
        const params = e.params as Record<string, unknown>;
        const extra = "additionalProperty" in params ? ` ("${String(params.additionalProperty)}")` : "";
        return `  ${e.instancePath || "root"}: ${e.message ?? "unknown error"}${extra}`;
      })
      .join("\n");

    expect.fail(`Schema validation failed:\n${errors ?? "unknown error"}`);
  }
  return valid;
}
