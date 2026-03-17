export type Fragment<Cfg> = (cfg: Cfg) => object;

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

export interface HasLang extends HasName {
  description?: string;
}

export interface HasIcon {
  icon?: string;
  iconGenerated?: boolean;
}
