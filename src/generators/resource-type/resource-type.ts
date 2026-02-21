import { global, syncJson, toPascal } from "../../index.js";
import type { ResourceTypeConfig, ResourceTypeData } from "./resource-type.types.js";

export function resourceType(id: string): void;
export function resourceType(id: string, icon: string): void;
export function resourceType(config: ResourceTypeConfig): void;
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
