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
    const {
      modId,
      paths: { category }
    } = global();

    json(`${category.json}/${modId}`, {
      id: modId,
      name: `${category.lang}.${modId}`,
      icon: `${category.icon}/${cfg.icon ?? modId}.png`,
      ...(cfg.order ? { order: cfg.order } : {}),
      children: cfg.children.map((child: Child) => {
        const isString = typeof child === "string";
        const childId = isString ? child : child.id;
        return {
          id: childId,
          name: `${category.lang}.${modId}.${childId}`,
          icon: `${category.icon}/${isString ? childId : child.icon}.png`
        };
      })
    });

    lang({
      [`${category.langRoot}.${modId}`]: cfg.name ?? modId,
      ...Object.fromEntries(
        cfg.children.map(child => [
          `${category.langRoot}.${modId}.${isString(child) ? child : child.id}`,
          isString(child) ? child : (child.name ?? child.id)
        ])
      )
    });
  }
});
