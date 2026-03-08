import type { HasId, HasSimpleIcon, HasType } from "#hg/index";
import { builder, json } from "#hg/index";

export const resourceType = builder({
  init: (id: string) => ({ id, iconGenerated: true, type: "resourceType" as const }),
  build: (cfg: HasId & HasSimpleIcon & HasType) => {
    json(cfg, f => [f.withId, f.withResourceTypeIcon]);
  }
});
