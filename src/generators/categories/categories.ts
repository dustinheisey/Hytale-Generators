import { global, syncJson, syncLang, toPascal } from "../../index.js";
import type { CategoriesConfig, CategoriesData, Child } from "./categories.types.js";

export function categories(children: Child[]): void;
export function categories(config: CategoriesConfig): void;
export function categories(cfg: Child[] | CategoriesConfig) {
  const modId = global().modId;
  const config: CategoriesConfig = Array.isArray(cfg) ? { children: cfg } : cfg;

  syncJson<CategoriesData>(
    `Server/Item/Category/CreativeLibrary/${modId}`,
    toPascal({
      id: modId,
      name: `server.ui.${modId}`,
      icon: `Icons/ItemCategories/${config.icon ?? modId}.png`,
      order: config.order ?? 0,
      children: config.children.map((child: Child) => {
        const isString = typeof child === "string";
        const childId = isString ? child : child.id;
        return {
          id: childId,
          name: `server.ui.${modId}.${childId}`,
          icon: `Icons/ItemCategories/${isString ? childId : child.icon}.png`
        };
      })
    })
  );

  const lang = [];

  lang.push({
    key: `ui.${modId}`,
    value: config.name ?? modId
  });

  config.children.forEach(child => {
    const isString = typeof child === "string";
    lang.push({
      key: `ui.${modId}.${isString ? child : child.id}`,
      value: isString ? child : child.name ?? child.id
    });
  });

  syncLang(lang);
}
