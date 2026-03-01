import type { HasIcon, HasId } from "hytale-generators";
import { global } from "hytale-generators";

const { modId } = global();

export function withTranslationProperties(cfg: HasId): object {
  const { id } = cfg;
  return {
    translationProperties: {
      name: `server.items.${modId}.${id}.name`,
      description: `server.items.${modId}.${id}.description`
    }
  };
}

export function withIcon(cfg: HasId & HasIcon): object {
  return { ...(cfg.icon ? { icon: `Icons/ItemsGenerated/${cfg.id}.png` } : {}) };
}

export const itemFragments = {
  withTranslationProperties,
  withIcon
};
