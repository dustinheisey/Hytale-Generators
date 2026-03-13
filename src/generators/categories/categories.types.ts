import { type HasName, type HasSimpleIcon, type Prettify } from "@";

export interface HasOrder {
  order?: number;
}

export type Child =
  | {
      id: string;
      icon: string;
      name?: string;
      iconGenerated?: boolean;
    }
  | string;

export interface HasChildren {
  children: Child[];
}

export type CategoriesCfg = Prettify<HasName & HasOrder & HasSimpleIcon & HasChildren>;
