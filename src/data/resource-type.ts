import { u } from "@text";

export const resourceType = (
  config: ResourceTypeConfig,
): ResourceTypeData => ({
  Icon: `Icons/ResourceTypes/${u(config.icon)}.png`,
});
