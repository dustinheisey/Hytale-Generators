import { syncJson, syncLang } from "@sync";
import { u } from "@text";
import { categories } from "@data";

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
    `Server/Item/Category/CreativeLibrary/${u(config.id)}`,
    categories(config),
  );
}
