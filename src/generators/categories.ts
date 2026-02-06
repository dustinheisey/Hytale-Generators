import { createGenerator, global } from "../index.ts";

type Child =
  | {
      Id: string;
      Name?: string;
      Icon: string;
    }
  | string;

export interface CategoriesConfig {
  Id: string;
  Name?: string;
  Icon?: string;
  Order?: number;
  Children: Child[];
}

interface CategoriesData {
  Id: string;
  Name: `server.ui.${string}`;
  Icon: `Icons/ItemCategories/${string}.png`;
  Order?: number;
  Children: {
    Id: string;
    Name: `server.ui.${string}`;
    Icon: `Icons/ItemCategories/${string}.png`;
  }[];
}

export const categories = createGenerator<CategoriesConfig, CategoriesData>({
  lang: c => {
    const lang = [];

    lang.push({
      key: `ui.${global().ModId}`,
      value: c.Name || c.Id
    });

    c.Children.forEach(child => {
      const isString = typeof child === "string";
      lang.push({
        key: `ui.${global().ModId}.${isString ? child : child.Id}`,
        value: isString ? child : child.Name || child.Id
      });
    });

    return lang;
  },
  json: {
    path: () => `Server/Item/Category/CreativeLibrary/${global().ModId}`,
    data: c => ({
      Id: global().ModId,
      Name: `server.ui.${global().ModId}`,
      Icon: `Icons/ItemCategories/${c.Icon || global().ModId}.png`,
      ...(c.Order !== undefined && { Order: c.Order }),
      Children: c.Children.map((child: Child) => {
        const isString = typeof child === "string";
        const childId = isString ? child : child.Id;
        return {
          Id: childId,
          Name: `server.ui.${global().ModId}.${childId}`,
          Icon: `Icons/ItemCategories/${isString ? childId : child.Icon}.png`
        };
      })
    })
  }
});
