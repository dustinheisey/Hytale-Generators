// Types that are used in multiple unrelated generators

export type HasId = { id: string };
export type HasGroup = { group?: string };

export type HasFilter<Filter> = {
  include?: Filter | Filter[];
  exclude?: Filter | Filter[];
};

export type FilterOf<C> = C extends HasFilter<infer F> ? F : never;

export interface HasName {
  name?: string;
  baseName?: string;
}

export interface HasLang {
  name?: string;
  baseName?: string;
  description?: string;
}

export interface HasIcon {
  icon?: string;
  iconGenerated?: boolean;
}

export interface HasParent {
  parent?: string;
}

export interface HasTags {
  tags?: string | string[];
}

export type HasCommon = HasParent & HasTags;
