import { builder, json } from "../../index.js";

type ResourceTypeCfg = {
  id: string;
  icon?: string;
};

export const resourceType = builder((cfg: ResourceTypeCfg) => {
  json(`Server/Item/ResourceTypes/${cfg.id}`, {
    id: cfg.id,
    icon: `Icons/ResourceTypes/${cfg.icon?.trim() || cfg.id}.png`
  });
});
