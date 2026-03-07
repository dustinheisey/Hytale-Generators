import { builder, json, global } from "#hg/index";

export type ResourceTypeCfg = {
  id: string;
  icon?: string;
};

export const resourceType = builder({
  init: (id: string) => ({ id }),
  build: (cfg: ResourceTypeCfg) => {
    const { resourceTypes } = global();
    json(`${resourceTypes.json}/${cfg.id}`, {
      id: cfg.id,
      icon: `${resourceTypes.icon}/${cfg.icon ?? cfg.id}.png`
    });
  }
});
