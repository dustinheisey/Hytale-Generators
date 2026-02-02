import { uSep } from "@util";
import { syncJson } from "@meta";

export const resourceType = (
  config: ResourceTypeConfig,
): ResourceTypeData => {
  return {
    Icon: `Icons/ResourceTypes/${uSep(config.icon)}.png`,
  };
};

/** Generate a single resource type JSON */
export function generateResourceType(type: ResourceTypeConfig) {
  syncJson(
    `Server/Item/ResourceTypes/${uSep(type.id)}`,
    resourceType(type),
  );
}

/** Generate resource type JSONs */
export function generateResourceTypes(types: ResourceTypeConfig[]) {
  types.forEach((type) => {
    generateResourceType(type);
  });
}
