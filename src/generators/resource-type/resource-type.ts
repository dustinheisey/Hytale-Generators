import { builder, json, withCommon, withIcon, type ResourceTypeCfg } from "@";

export const resourceType = builder((cfg: ResourceTypeCfg, { paths: { resourceType } }) =>
  json(`${resourceType.json}/${cfg.id}`, [withCommon(cfg), withIcon(cfg, "ResourceTypes")])
);
