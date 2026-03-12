import { builder, json, withCommon, withSimpleIcon, type ResourceTypeCfg } from "@";

export const resourceType = builder((cfg: ResourceTypeCfg, { paths: { resourceType } }) =>
  json(`${resourceType.json}/${cfg.id}`, [withCommon(cfg), withSimpleIcon(cfg, "ResourceTypes")])
);
