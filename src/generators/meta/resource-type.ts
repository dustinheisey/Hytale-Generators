import { builder, json, type Builder } from "hytale-generators";

type ResourceTypeCfg = {
  id: string;
  icon?: string;
};

export const resourceType: Builder<ResourceTypeCfg> = builder((cfg: ResourceTypeCfg) => {
  json(`Server/Item/ResourceTypes/${cfg.id}`, {
    id: cfg.id,
    icon: `Icons/ResourceTypes/${cfg.icon?.trim() || cfg.id}.png`
  });
});
