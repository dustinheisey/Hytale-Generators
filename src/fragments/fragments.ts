import { global, type HasIcon, type HasId, type HasSimpleIcon } from "#hg/index";

export type Fragment<Cfg> = (cfg: Cfg) => object;
export type Fragments = typeof fragments;
export type CompatibleFragments<Cfg> = {
  [K in keyof Fragments]: Fragments[K] extends Fragment<Cfg> ? Fragments[K] : never;
};

export const fragments = {
  withTranslationProperties: (cfg: HasId) => {
    const { modId } = global();
    const { id } = cfg;
    return {
      translationProperties: {
        name: `server.items.${modId}.${id}.name`,
        description: `server.items.${modId}.${id}.description`
      }
    };
  },

  /**
   * Adds the `Id` field to the JSON output.
   * @example { Id: "Iron_Ore" }
   */
  withId: (cfg: HasId) => ({ id: cfg.id }),
  withResourceTypeIcon: (cfg: HasId & HasSimpleIcon) =>
    cfg.iconGenerated ? { icon: `${global().paths.resourceType.icon}/${cfg.icon ?? cfg.id}.png` } : {},
  // json(`${category.json}/${modId}`, {
  //   id: modId,
  //   name: `${category.lang}.${modId}`,
  //   icon: `${category.icon}/${cfg.icon ?? modId}.png`,
  //   ...(cfg.order ? { order: cfg.order } : {}),
  /**
   * Adds the `Icon` field using the global resource type icon path.
   * @example { Icon: "Icons/ResourceTypes/Iron_Ore" }
   */
  withIcon: (cfg: HasId & HasIcon) => (cfg.icon ? { icon: `Icons/ItemsGenerated/${cfg.id}.png` } : {})
};
