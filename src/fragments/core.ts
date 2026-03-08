import type { CfgType, Child } from "#hg/index";

export interface HasId {
  id: string;
}

export interface HasName {
  name?: string;
  baseName?: string;
}

export interface HasLang extends HasName {
  description?: string;
}

export interface HasSimpleIcon {
  icon?: string;
  iconGenerated?: boolean;
}

export interface HasIcon extends HasSimpleIcon {
  baseIcon?: string;
  iconProperties?: {
    Scale: number;
    Rotation: [number, number, number];
    Translation: [number, number];
  };
}

export interface HasType {
  type: CfgType;
}

export interface HasChildren {
  children: Child[];
}
