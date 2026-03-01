import { builderNoId, global, isString, json, lang, type BuilderNoId } from "../../index.js";

export type Child =
  | {
      id: string;
      name?: string;
      icon: string;
    }
  | string;

type CategoriesCfg = {
  icon?: string;
  name?: string;
  order?: number;
  children: Child[];
};

export const categories: BuilderNoId<CategoriesCfg> = builderNoId(cfg => {
  const modId = global().modId;

  json(`Server/Item/Category/CreativeLibrary/${modId}`, {
    id: modId,
    name: `server.ui.${modId}`,
    icon: `Icons/ItemCategories/${cfg.icon ?? modId}.png`,
    order: cfg.order ?? 0,
    children: cfg.children.map((child: Child) => {
      const isString = typeof child === "string";
      const childId = isString ? child : child.id;
      return {
        id: childId,
        name: `server.ui.${modId}.${childId}`,
        icon: `Icons/ItemCategories/${isString ? childId : child.icon}.png`
      };
    })
  });

  lang([
    {
      key: `ui.${modId}`,
      value: cfg.name ?? modId
    },
    ...cfg.children.map(child => ({
      key: `ui.${modId}.${isString(child) ? child : child.id}`,
      value: isString(child) ? child : (child.name ?? child.id)
    }))
  ]);
});
