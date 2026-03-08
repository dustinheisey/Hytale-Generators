import type { HasIcon, HasId } from "#hg/index";
import { global } from "#hg/index";

export type Fragment<Cfg> = (cfg: Cfg) => object;

export function withTranslationProperties(cfg: HasId) {
  const { modId } = global();
  const { id } = cfg;
  return {
    translationProperties: {
      name: `server.items.${modId}.${id}.name`,
      description: `server.items.${modId}.${id}.description`
    }
  };
}

export function withId(cfg: HasId) {
  return { id: cfg.id };
}

export interface HasResourceIcon {
  icon?: string;
}

export function withResourceIcon(cfg: HasId & HasResourceIcon) {
  return cfg.icon ? { icon: `${global().paths.resourceType.icon}/${cfg.icon ?? cfg.id}.png` } : {};
}

export function withIcon(cfg: HasId & HasIcon) {
  return { ...(cfg.icon ? { icon: `Icons/ItemsGenerated/${cfg.id}.png` } : {}) };
}

export const fragments = {
  withTranslationProperties,
  withIcon
};
