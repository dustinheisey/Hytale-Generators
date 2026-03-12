import { builder, json, withSimpleIcon, type ResourceTypeCfg } from "#hg";

export const resourceType = builder((cfg: ResourceTypeCfg, { paths: { resourceType } }) =>
  json(`${resourceType.json}/${cfg.id}`, [withSimpleIcon(cfg, "ResourceTypes")])
);
