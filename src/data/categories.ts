import { u } from "@text";

export const categories = (config: CategoriesConfig): CategoriesData => {
  const { id, icon, order, children } = config;
  
  return {
    Id: u(id),
    Name: `server.ui.${id}`,
    Icon: `Icons/ItemCategories/${icon || u(id)}.png`,
    ...(order && { Order: order }),
    Children: children.map((child: Child) => {
      const isString = typeof child === "string";
      const childId = isString ? child : child.id;
      return {
        Id: u(childId),
        Name: `server.ui.${id}.${childId}`,
        Icon: `Icons/ItemCategories/${
          isString ? u(childId) : u(child.icon)
        }.png`,
      };
    }),
  };
};