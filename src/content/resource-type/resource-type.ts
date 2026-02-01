import { uSep } from "@text";
import { syncJson } from "@sync";

export const resourceType = (
  config: ResourceTypeConfig,
): ResourceTypeData => {
  return {
    Icon: `Icons/ResourceTypes/${
      uSep(typeof config === "string" ? "rock" : config.icon)
    }.png`,
  };
};

export function generateResourceType(type: ResourceTypeConfig) {
  syncJson(
    `Server/Item/ResourceTypes/${
      uSep(typeof type === "string" ? type : type.id)
    }`,
    resourceType(type),
  );
}
