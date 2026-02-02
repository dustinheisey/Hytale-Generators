import { u, uSep } from "@util";
import { syncJson, syncLang } from "@meta";

const data = (config: CategoriesConfig): CategoriesData => {
  const { id, icon, order, children } = config;

  return {
    Id: uSep(id),
    Name: `server.ui.${id}`,
    Icon: `Icons/ItemCategories/${icon || uSep(id)}.png`,
    ...(order && { Order: order }),
    Children: children.map((child: Child) => {
      const isString = typeof child === "string";
      const childId = isString ? child : child.id;
      return {
        Id: uSep(childId),
        Name: `server.ui.${id}.${childId}`,
        Icon: `Icons/ItemCategories/${
          isString ? uSep(childId) : uSep(child.icon)
        }.png`,
      };
    }),
  };
};

/** Generate creative categories JSON */
export function generateCategories(config: CategoriesConfig) {
  syncLang({
    name: {
      key: `ui.${config.id}`,
      value: config.name || u(config.id),
    },
  });

  config.children.forEach((child) => {
    const isString = typeof child === "string";
    syncLang({
      name: {
        key: `ui.${config.id}.${isString ? child : child.id}`,
        value: isString ? u(child) : (child.name || u(child.id)),
      },
    });
  });

  syncJson(
    `Server/Item/Category/CreativeLibrary/${uSep(config.id)}`,
    data(config),
  );
}
