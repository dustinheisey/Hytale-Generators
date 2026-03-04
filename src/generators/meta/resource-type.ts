import { builder, json } from "../../index.js";

export type ResourceTypeCfg = {
  id: string;
  icon?: string;
};

export const resourceType = builder({
  init: (id: string) => ({ id }),
  build: (cfg: ResourceTypeCfg) => {
    json(`Server/Item/ResourceTypes/${cfg.id}`, {
      id: cfg.id,
      icon: `Icons/ResourceTypes/${cfg.icon?.trim() || cfg.id}.png`
    });
  }
});
