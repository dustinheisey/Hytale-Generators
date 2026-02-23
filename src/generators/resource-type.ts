import type { Pascal } from "../index.js";
import { global, syncJson, toPascal } from "../index.js";

export interface ResourceTypeConfig {
  id: string;
  icon: string;
}

export type ResourceTypeData = Pascal<ResourceTypeConfig>;

export function resourceType(config: string | ResourceTypeConfig, icon?: string) {
  const id = typeof config === "string" ? config : config.id;

  syncJson<ResourceTypeData>(
    `${global().outDir}/Server/Item/ResourceTypes/${id}`,
    toPascal({
      id: id,
      icon: `Icons/ResourceTypes/${typeof icon === "string" ? icon : typeof config === "string" ? id : config.icon}.png`
    })
  );
}
