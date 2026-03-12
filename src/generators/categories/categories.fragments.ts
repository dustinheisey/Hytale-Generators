import { globals as g, type HasChildren, type HasOrder } from "@";

export const withOrder = ({ order }: HasOrder) => (order ? { order } : {});
export const withChildren = ({ children }: HasChildren) => {
  const {
    paths: { categories },
    modId
  } = g();
  return {
    children: children.map(child => {
      const isString = typeof child === "string";
      const childId = isString ? child : child.id;
      return {
        id: childId,
        name: `${categories.lang}.${modId}.${childId}`,
        icon: `${categories.icon}/${isString ? childId : child.icon}.png`
      };
    })
  };
};
