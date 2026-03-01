import type { HasIcon, HasId } from "../../index.js";
import { global } from "../../index.js";

export function withTranslationProperties(cfg: HasId): object {
  const { modId } = global();
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
