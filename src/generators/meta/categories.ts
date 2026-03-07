import { builder, global, isString, json, lang } from "#hg/index";

export type Child =
  | {
      id: string;
      name?: string;
      icon: string;
    }
  | string;

export type CategoriesCfg = {
  icon?: string;
  name?: string;
  order?: number;
  children: Child[];
};

export const categories = builder({
  build: (cfg: CategoriesCfg) => {
    const { modId, categories } = global();

    json(`${categories.json}/${modId}`, {
      id: modId,
      name: `${categories.lang}.${modId}`,
      icon: `${categories.icon}/${cfg.icon ?? modId}.png`,
      ...(cfg.order ? { order: cfg.order } : {}),
      children: cfg.children.map((child: Child) => {
        const isString = typeof child === "string";
        const childId = isString ? child : child.id;
        return {
          id: childId,
          name: `${categories.lang}.${modId}.${childId}`,
          icon: `${categories.icon}/${isString ? childId : child.icon}.png`
        };
      })
    });

    lang([
      {
        key: `${categories.langRoot}.${modId}`,
        value: cfg.name ?? modId
      },
      ...cfg.children.map(child => ({
        key: `${categories.langRoot}.${modId}.${isString(child) ? child : child.id}`,
        value: isString(child) ? child : (child.name ?? child.id)
      }))
    ]);
  }
});
