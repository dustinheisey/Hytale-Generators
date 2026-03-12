import { type HasId, type HasName, type HasSimpleIcon, type Prettify } from "@hg";

export interface HasOrder {
  order?: number;
}

export type Child =
  | {
      id: string;
      icon: string;
      name?: string;
    }
  | string;

export interface HasChildren {
  children: Child[];
}

export type CategoriesCfg = Prettify<HasId & HasName & HasOrder & HasSimpleIcon & HasChildren>;
