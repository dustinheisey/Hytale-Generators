declare interface CategoriesConfig {
  id: string;
  name?: string;
  order?: number;
  icon?: string;
  children: Child[];
}

declare interface CategoriesData {
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

type Child = {
  id: string;
  name?: string;
  icon: string;
} | string;
