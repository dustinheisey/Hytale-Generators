import { u } from "@text";
import { syncJson } from "@sync";

export const resourceType = (
  config: ResourceTypeConfig,
): ResourceTypeData => {
  return {
    Icon: `Icons/ResourceTypes/${
      u(typeof config === "string" ? config : config.icon)
    }.png`,
  };
};

export function generateResourceType(type: ResourceTypeConfig) {
  syncJson(
    `Server/Item/ResourceType/${u(typeof type === "string" ? type : type.id)}`,
    resourceType(type),
  );
}
