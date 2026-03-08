import { builder, global, simpleJson, withId, withResourceIcon } from "#hg/index";

export type ResourceTypeCfg = {
  id: string;
  icon?: string;
};

export const resourceType = builder({
  init: (id: string) => ({ id }),
  build: (cfg: ResourceTypeCfg) => {
    simpleJson(`${global().resourceTypes.json}/${cfg.id}`, cfg, [withId, withResourceIcon]);
  }
});
