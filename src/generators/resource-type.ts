import { createGenerator } from "../index.ts";

export type ResourceTypeConfig = {
  Id: string;
  Icon: string;
};

type ResourceTypeData = Omit<ResourceTypeConfig, "Id">;

export const resourceType = createGenerator<ResourceTypeConfig, ResourceTypeData>({
  json: {
    path: c => `Server/Item/ResourceTypes/${c.Id}`,
    data: c => ({
      Icon: `Icons/ResourceTypes/${c.Icon}.png`
    })
  }
});
