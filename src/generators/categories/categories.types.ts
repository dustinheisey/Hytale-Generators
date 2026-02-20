import type { Pascal } from "../../index.js";

export type Child =
  | {
      id: string;
      name?: string;
      icon: string;
    }
  | string;

export interface CategoriesConfig {
  icon?: string;
  name?: string;
  order?: number;
  children: Child[];
}

export type CategoriesData = Pascal<Required<CategoriesConfig> & { id: string }>;
