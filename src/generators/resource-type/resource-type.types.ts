import type { Pascal } from "../../index.js";

export interface ResourceTypeConfig {
  id: string;
  icon: string;
}

export type ResourceTypeData = Pascal<ResourceTypeConfig>;
