import type { Pascal } from "../index.js";
import { global, syncJson, syncLang, toPascal } from "../index.js";

export type Child =
  | {
      id: string;
      name?: string;
      icon: string;
    }
  | string;

export interface CategoriesConfig {
  icon?: string;
  name?: string;
  order?: number;
  children: Child[];
}

export type CategoriesData = Pascal<Required<CategoriesConfig> & { id: string }>;

export function categories(cfg: Child[] | CategoriesConfig) {
  const modId = global().modId;
  const config: CategoriesConfig = Array.isArray(cfg) ? { children: cfg } : cfg;

  syncJson<CategoriesData>(
    `${global().outDir}/Server/Item/Category/CreativeLibrary/${modId}`,
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
      value: isString ? child : (child.name ?? child.id)
    });
  });

  syncLang(lang);
}
