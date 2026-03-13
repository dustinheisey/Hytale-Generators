import { builder, isString, json, lang, withChildren, withOrder, withSimpleIcon, type CategoriesCfg } from "@";

export const categories = builder((cfg: CategoriesCfg, { modId, paths: { categories } }) => {
  const langKey = `${categories.langRoot}.${modId}`;

  lang(langKey, cfg.name ?? modId);
  cfg.children.forEach(child => {
    lang(`${langKey}.${isString(child) ? child : child.id}`, isString(child) ? child : (child.name ?? child.id));
  });

  return json(`${categories.json}/${modId}`, [
    withOrder(cfg),
    withSimpleIcon({ ...cfg, icon: cfg.icon ?? modId, id: modId }, "ItemCategories"),
    withChildren(cfg)
  ]);
});
