export { deriveEffectColors } from "./util/color.ts";
export { syncDir } from "./util/syncDir.ts";
export { syncFile } from "./util/syncFile.ts";
export { syncJson } from "./util/syncJson.ts";
export { syncLang } from "./util/syncLang.ts";
export { syncTexture } from "./util/syncTexture.ts";
export { join, u, uSep } from "./util/text.ts";
import { alloys } from "./generators/alloy.ts";
import { categories } from "./generators/categories.ts";
import { elements } from "./generators/element.ts";
import { gems } from "./generators/gem.ts";
import { manifest } from "./generators/manifest.ts";
import { resourceType } from "./generators/resource-type.ts";
import type { GlobalConfig } from "./index.types.ts";
import { syncPublic } from "./util/syncPublic.ts";

export { createGenerator } from "./createGenerator.ts";

export { alloy } from "./generators/alloy.ts";
export { categories } from "./generators/categories.ts";
export { dust } from "./generators/dust.ts";
export { gem } from "./generators/gem.ts";
export { ingot } from "./generators/ingot.ts";
export { manifest } from "./generators/manifest.ts";
export { oreBlock } from "./generators/ore-block.ts";
export { ore } from "./generators/ore.ts";
export { recipe } from "./generators/recipe.ts";
export { resourceType } from "./generators/resource-type.ts";

export { element } from "./generators/element.ts";

export const globalConfig: GlobalConfig = {
  MaxStack: 100,
  TimeSeconds: 14
};

// ? Meta
syncPublic();

// ? Content
manifest({
  Group: "gg.inconvenient",
  Name: "Unified Materials",
  Version: "0.2.0",
  Description: "Lots of materials for use in other mods",
  Authors: [
    {
      Name: "Inconvenient Dev",
      Url: "https://inconvenient.gg"
    }
  ],
  Website: "https://www.curseforge.com/hytale/mods/unified-materials"
});

categories({
  Id: "Unified_Materials",
  Name: "Unified Materials",
  Children: ["Ores", "Gems", "Dusts", "Ingots", { Id: "Alloys", Icon: "Ingots" }]
});

resourceType({ Id: "Dusts", Icon: "Rock" });
resourceType({ Id: "Alloys", Icon: "Rock" });

elements({
  vanilla: [
    {
      Id: "Hematite",
      Color: "#929291",
      Dust: { Name: "Iron" },
      Exclude: ["Ingot"]
    },
    {
      Id: "Malachite",
      Color: "#2C7144",
      Dust: { Color: "#D08046", Name: "Copper" },
      Exclude: ["Ingot"]
    },
    {
      Id: "Acanthite",
      Color: "#EBE9EB",
      Dust: { Name: "Silver" },
      Exclude: ["Ingot"]
    },
    {
      Id: "Cobaltite",
      Color: "#25476C",
      Dust: { Name: "Cobalt" },
      Exclude: ["Ingot"]
    },
    { Id: "Gold", Color: "#F4CD25", Exclude: ["Ingot"] },
    { Id: "Thorium", Color: "#2C7144", Exclude: ["Ingot"] }
  ],
  alkaliMetals: [
    {
      Id: "Lithium",
      Color: "#B6B6E2",
      Ores: { Name: "Spodumene" }
    },
    {
      Id: "Sodium",
      Color: "#e1eaff",
      Ores: { Name: "Halite" },
      Ingot: { Variant: "Lightest" }
    },
    {
      Id: "Potassium",
      Color: "#9DA6EB",
      Ores: { Name: "Sylvite" }
    },
    {
      Id: "Rubidium",
      Color: "#9A93E5",
      Ores: {
        Name: "Lepidolite",
        Description: "rubidium"
      }
    },
    {
      Id: "Caesium",
      Color: "#E8C95A",
      Ores: { Name: "Pollucite" }
    },
    { Id: "Francium", Color: "#6732D2" }
  ],
  alkalineEarthMetals: [
    {
      Id: "Beryllium",
      Color: "#8CB1DD",
      Ores: {
        Name: "Bertrandite"
      }
    },
    {
      Id: "Magnesium",
      Color: "#95B8F3",
      Ores: {
        Name: "Magnesite"
      }
    },
    {
      Id: "Calcium",
      Color: "#C4D5EC",
      Ores: { Name: "Calcite" },
      Ingot: { Variant: "Light" }
    },
    {
      Id: "Strontium",
      Color: "#A89AE3",
      Ores: {
        Name: "Celestite"
      }
    },
    {
      Id: "Barium",
      Color: "#E0CD77",
      Ores: { Name: "Barite" }
    },
    { Id: "Radium", Color: "#4D4DD6" }
  ],
  transitionMetals: [
    { Id: "Scandium", Color: "#88B2DC" },

    {
      Id: "Titanium",
      Color: "#AEB6BF",
      Ores: { Name: "Rutile" },
      Ingot: { Variant: "Light" }
    },
    {
      Id: "Vanadium",
      Color: "#2a0651",
      Ores: {
        Name: "Vanadinite"
      },
      Ingot: { Variant: "Dark" }
    },
    {
      Id: "Chromium",
      Color: "#2B9A32",
      Ores: { Name: "Chromite" }
    },
    {
      Id: "Manganese",
      Color: "#6B7076",
      Ores: {
        Name: "Pyrolusite"
      },
      Ingot: { Variant: "Light" }
    },
    {
      Id: "Nickel",
      Color: "#8A8570",
      Ores: {
        Name: "Pentlandite"
      }
    },
    {
      Id: "Zinc",
      Color: "#9FA7B0",
      Ores: { Name: "Sphalerite" },
      Ingot: { Variant: "Light" }
    },
    {
      Id: "Yttrium",
      Color: "#7FB4EA",
      Ores: { Name: "Xenotime" }
    },
    {
      Id: "Zirconium",
      Color: "#8ABAE6",
      Ores: { Name: "Zircon" }
    },
    {
      Id: "Niobium",
      Color: "#3D87C1",
      Ores: {
        Name: "Pyrochlore"
      }
    },
    {
      Id: "Molybdenum",
      Color: "#2D83C8",
      Ores: {
        Name: "Molybdenite"
      }
    },
    { Id: "Technetium", Color: "#2D2DA1" },
    { Id: "Ruthenium", Color: "#2C7DB5" },
    { Id: "Rhodium", Color: "#86A6E0" },
    { Id: "Palladium", Color: "#bd7018" },
    { Id: "Cadmium", Color: "#5DB49C" },
    { Id: "Hafnium", Color: "#7BAEE3" },
    {
      Id: "Tantalum",
      Color: "#2C7EB4",
      Ores: {
        Name: "Tantalite"
      }
    },
    {
      Id: "Tungsten",
      Color: "#503b27",
      Ores: {
        Name: "Wolframite"
      }
    },
    { Id: "Rhenium", Color: "#1E568C" },
    { Id: "Osmium", Color: "#1F3F5A" },
    { Id: "Iridium", Color: "#646d7a", Ingot: { Variant: "Light" } },
    {
      Id: "Platinum",
      Color: "#D5DBE2",
      Ores: { Name: "Ilmenite" }
    },
    {
      Id: "Mercury",
      Color: "#C9CCD1",
      Ores: {
        Name: "Cinnabar",
        Color: "#B0120C"
      }
    },
    { Id: "Rutherfordium", Color: "#1E5A93" },
    { Id: "Dubnium", Color: "#1A4F8F" },
    { Id: "Seaborgium", Color: "#17508F" },
    { Id: "Bohrium", Color: "#4A1FB0" },
    { Id: "Hassium", Color: "#164E7D" },
    { Id: "Meitnerium", Color: "#16306A" },
    { Id: "Darmstadtium", Color: "#1E5A7A" },
    { Id: "Roentgenium", Color: "#7A2A2A" },
    { Id: "Copernicium", Color: "#7B33D1" }
  ],
  postTransitionMetals: [
    {
      Id: "Aluminum",
      Color: "#D0D6DE",
      Ores: { Name: "Bauxite" },
      Ingot: { Variant: "Light" }
    },
    { Id: "Gallium", Color: "#7EBBF1" },
    { Id: "Indium", Color: "#7BBBE4" },
    {
      Id: "Thallium",
      Color: "#8BAA1D",
      Ores: {
        Name: "Lorandite"
      }
    },
    { Id: "Nihonium", Color: "#4A1BB0" },
    {
      Id: "Tin",
      Color: "#A6AFB8",
      Ores: { Name: "Cassiterite" },
      Ingot: { Variant: "Light" }
    },
    {
      Id: "Lead",
      Color: "#44324e",
      Ores: { Name: "Galena" }
    },
    { Id: "Flerovium", Color: "#2D63A1" },
    {
      Id: "Bismuth",
      Color: "#7A667F",
      Ores: {
        Name: "Bismuthinite"
      }
    },
    { Id: "Moscovium", Color: "#6A1F93" },
    { Id: "Polonium", Color: "#2D3A47" },
    { Id: "Livermorium", Color: "#7A1F6A" }
  ],
  metalloids: [
    {
      Id: "Boron",
      Color: "#1F1F22",
      Ores: { Name: "Borax" }
    },
    {
      Id: "Silicon",
      Color: "#5B616B",
      Ores: { Name: "Quartz" }
    },
    {
      Id: "Germanium",
      Color: "#3535B0",
      Ores: {
        Name: "Germanite"
      }
    },
    {
      Id: "Arsenic",
      Color: "#4C5056",
      Ores: {
        Name: "Arsenopyrite"
      }
    },
    {
      Id: "Antimony",
      Color: "#3838AD",
      Ores: { Name: "Stibnite" }
    },
    {
      Id: "Tellurium",
      Color: "#6A29B4",
      Ores: {
        Name: "Tellurite"
      }
    }
  ],
  otherNonmetals: [
    { Id: "Hydrogen", Color: "#BFEFFF", Ingot: { Variant: "Lightest" } },
    {
      Id: "Carbon",
      Color: "#2A2A2A",
      Ingot: { Variant: "Dark" },
      Ores: { Name: "Graphite" }
    },
    { Id: "Nitrogen", Color: "#6A9BFF" },
    {
      Id: "Phosphorus",
      Color: "#004AA8",
      Ores: {
        Name: "Apatite"
      }
    },
    { Id: "Oxygen", Color: "#88FFFF" },
    { Id: "Sulfur", Color: "#E0C000", Ingot: { Variant: "Light" } },
    { Id: "Selenium", Color: "#B01A1A" }
  ],
  halides: [
    {
      Id: "Fluorine",
      Color: "#D6DF7A",
      Ores: { Name: "fluorite" },
      Ingot: { Variant: "Light" }
    },
    { Id: "Chlorine", Color: "#7DDE00" },
    { Id: "Bromine", Color: "#8B1400" },
    { Id: "Iodine", Color: "#3A004A" },
    { Id: "Astatine", Color: "#2C2C88" },
    { Id: "Tennessine", Color: "#4DB6AC" }
  ],
  nobleGases: [
    { Id: "Helium", Color: "#EAD7FF" },
    { Id: "Neon", Color: "#FF7AC7" },
    { Id: "Argon", Color: "#CFE8FF" },
    { Id: "Krypton", Color: "#8FB0FF" },
    { Id: "Xenon", Color: "#6D8CFF" },
    { Id: "Radon", Color: "#4D4DB0" },
    { Id: "Oganesson", Color: "#2D2B47" }
  ],
  lanthanides: [
    { Id: "Lanthanum", Color: "#B3D2F4" },
    { Id: "Cerium", Color: "#A7E0C6" },
    { Id: "Praseodymium", Color: "#7BE199" },
    { Id: "Neodymium", Color: "#7BAEF4" },
    { Id: "Promethium", Color: "#6D6578" },
    { Id: "Samarium", Color: "#B9B9F0" },
    { Id: "Europium", Color: "#7BC8E6" },
    { Id: "Gadolinium", Color: "#6BB9DE" },
    { Id: "Terbium", Color: "#5FD59B" },
    { Id: "Dysprosium", Color: "#9DD45D" },
    { Id: "Holmium", Color: "#7DD43B" },
    { Id: "Erbium", Color: "#6BCB8C" },
    { Id: "Thulium", Color: "#6B8FD4" },
    { Id: "Ytterbium", Color: "#C5C5F0" },
    { Id: "Lutetium", Color: "#B5E0B5" }
  ],
  actinides: [
    { Id: "Actinium", Color: "#4D4DD6" },
    { Id: "Protactinium", Color: "#2C7EB4" },
    {
      Id: "Uranium",
      Color: "#657148",
      Ores: { Name: "Uraninite" }
    },
    { Id: "Neptunium", Color: "#1E5A93" },
    { Id: "Plutonium", Color: "#585E5A" },
    { Id: "Americium", Color: "#2D2DA1" },
    { Id: "Curium", Color: "#2C2C8C" },
    { Id: "Berkelium", Color: "#17508F" },
    { Id: "Californium", Color: "#4A1BB0" },
    { Id: "Einsteinium", Color: "#16306A" },
    { Id: "Fermium", Color: "#145E5E" },
    { Id: "Mendelevium", Color: "#6A1F93" },
    { Id: "Nobelium", Color: "#2D3A47" },
    { Id: "Lawrencium", Color: "#2E2E71" }
  ]
});

gems([
  { Id: "Amber", Color: "#A85A00" },
  { Id: "Amethyst", Color: "#32114b", Variant: "Dark" },
  { Id: "Aquamarine", Color: "#00424a" },
  { Id: "Bloodstone", Color: "#780016", Variant: "Dark" },
  { Id: "Carnelian", Color: "#8B2E1A" },
  { Id: "Citrine", Color: "#B07F00" },
  { Id: "Diopside", Color: "#15723f" },
  { Id: "Garnet", Color: "#870012" },
  { Id: "Jade", Color: "#007246" },
  { Id: "Lazurite", Color: "#1A3F7A", Variant: "Dark" },
  { Id: "Moonstone", Color: "#a1a7b8", Variant: "Light" },
  { Id: "Obsidian", Color: "#170727", Variant: "Dark" },
  { Id: "Olivine", Color: "#889533" },
  { Id: "Onyx", Color: "#050505", Variant: "Dark" },
  { Id: "Opal", Color: "#F4F1E8", Variant: "Light" },
  { Id: "Peridot", Color: "#869e10" },
  { Id: "Rose_Quartz", Color: "#B76B7A" },
  { Id: "Sodalite", Color: "#15224D", Variant: "Dark" },
  { Id: "Sunstone", Color: "#c7610d" },
  { Id: "Tigers_Eye", Color: "#894d17", Variant: "Dark" },
  { Id: "Turquoise", Color: "#007989" }
]);

alloys([
  {
    Id: "Alnico",
    Variant: "Dark",
    Color: "#6b4a3a",
    Inputs: [
      { ItemId: "Ingredient_Bar_Iron", Name: "Iron", Quantity: 3 },
      { ItemId: "Ingot_Nickel", Name: "Nickel", Quantity: 1 },
      { ItemId: "Ingredient_Bar_Cobalt", Name: "Cobalt", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Duralumin",
    Variant: "Lightest",
    Color: "#b8c6d8",
    Inputs: [
      { ItemId: "Ingot_Aluminum", Name: "Aluminum", Quantity: 3 },
      { ItemId: "Ingredient_Bar_Copper", Name: "Copper", Quantity: 1 },
      { ItemId: "Ingot_Magnesium", Name: "Magnesium", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Bismanol",
    Variant: "Dark",
    Color: "#344657",
    Inputs: [
      { ItemId: "Ingot_Bismuth", Name: "Bismuth", Quantity: 1 },
      { ItemId: "Ingot_Manganese", Name: "Manganese", Quantity: 1 }
    ],
    OutputQuantity: 2
  },
  {
    Id: "Rose_Metal",
    Variant: "Lightest",
    Color: "#b9c2cb",
    Inputs: [
      { ItemId: "Ingot_Bismuth", Name: "Bismuth", Quantity: 3 },
      { ItemId: "Ingot_Lead", Name: "Lead", Quantity: 1 },
      { ItemId: "Ingot_Tin", Name: "Tin", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Nichrome",
    Variant: "Light",
    Color: "#9f9a87",
    Inputs: [
      { ItemId: "Ingot_Nickel", Name: "Nickel", Quantity: 4 },
      { ItemId: "Ingot_Chromium", Name: "Chromium", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Ferrochrome",
    Color: "#586457",
    Inputs: [
      { ItemId: "Ingredient_Bar_Iron", Name: "Iron", Quantity: 2 },
      { ItemId: "Ingot_Chromium", Name: "Chromium", Quantity: 3 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Megallium",
    Color: "#466a7d",
    Inputs: [
      { ItemId: "Ingredient_Bar_Cobalt", Name: "Cobalt", Quantity: 3 },
      { ItemId: "Ingot_Chromium", Name: "Chromium", Quantity: 1 },
      { ItemId: "Ingot_Molybdenum", Name: "Molybdenum", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Talonite",
    Variant: "Dark",
    Color: "#3c5b6e",
    Inputs: [
      { ItemId: "Ingredient_Bar_Cobalt", Name: "Cobalt", Quantity: 3 },
      { ItemId: "Ingot_Chromium", Name: "Chromium", Quantity: 1 },
      { ItemId: "Ingot_Molybdenum", Name: "Molybdenum", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Vitallium",
    Color: "#4F8A73",
    Inputs: [
      { ItemId: "Ingredient_Bar_Cobalt", Name: "Cobalt", Quantity: 13 },
      { ItemId: "Ingot_Chromium", Name: "Chromium", Quantity: 6 },
      { ItemId: "Ingot_Molybdenum", Name: "Molybdenum", Quantity: 1 }
    ],
    OutputQuantity: 2
  },
  {
    Id: "Brass",
    Variant: "Light",
    Color: "#d6a33a",
    Inputs: [
      { ItemId: "Ingredient_Bar_Copper", Name: "Copper", Quantity: 2 },
      { ItemId: "Ingot_Zinc", Name: "Zinc", Quantity: 1 }
    ],
    OutputQuantity: 3
  },
  {
    Id: "Bronze",
    Color: "#b06a2a",
    Inputs: [
      { ItemId: "Ingredient_Bar_Copper", Name: "Copper", Quantity: 3 },
      { ItemId: "Ingot_Tin", Name: "Tin", Quantity: 2 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Arsenical_Bronze",
    Color: "#9a6a3a",
    Inputs: [
      { ItemId: "Ingredient_Bar_Copper", Name: "Copper", Quantity: 3 },
      { ItemId: "Ingot_Arsenic", Name: "Arsenic", Quantity: 1 },
      { ItemId: "Ingot_Tin", Name: "Tin", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Bismuth_Bronze",
    Color: "#a77b5a",
    Inputs: [
      { ItemId: "Ingredient_Bar_Copper", Name: "Copper", Quantity: 3 },
      { ItemId: "Ingot_Tin", Name: "Tin", Quantity: 1 },
      { ItemId: "Ingot_Bismuth", Name: "Bismuth", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Constantan",
    Variant: "Light",
    Color: "#b0a79b",
    Inputs: [
      { ItemId: "Ingredient_Bar_Copper", Name: "Copper", Quantity: 3 },
      { ItemId: "Ingot_Nickel", Name: "Nickel", Quantity: 2 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Hepatizon",
    Variant: "Dark",
    Color: "#3b2a3e",
    Inputs: [
      { ItemId: "Ingredient_Bar_Copper", Name: "Copper", Quantity: 3 },
      { ItemId: "Ingredient_Bar_Gold", Name: "Gold", Quantity: 1 },
      { ItemId: "Ingredient_Bar_Silver", Name: "Silver", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Galinsstan",
    Variant: "Lightest",
    Color: "#d2dae5",
    Inputs: [
      { ItemId: "Ingot_Gallium", Name: "Gallium", Quantity: 3 },
      { ItemId: "Ingot_Indium", Name: "Indium", Quantity: 1 },
      { ItemId: "Ingot_Tin", Name: "Tin", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Electrum",
    Variant: "Lightest",
    Color: "#d9cf6a",
    Inputs: [
      { ItemId: "Ingredient_Bar_Gold", Name: "Gold", Quantity: 3 },
      { ItemId: "Ingredient_Bar_Silver", Name: "Silver", Quantity: 2 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Purple_gold",
    Color: "#7c4aa8",
    Inputs: [
      { ItemId: "Ingredient_Bar_Gold", Name: "Gold", Quantity: 4 },
      { ItemId: "Ingot_Aluminum", Name: "Aluminum", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Blue_Gold",
    Color: "#2f63c7",
    Inputs: [
      { ItemId: "Ingredient_Bar_Gold", Name: "Gold", Quantity: 4 },
      { ItemId: "Ingot_Indium", Name: "Indium", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Gray_Gold",
    Color: "#b7ad9e",
    Inputs: [
      { ItemId: "Ingredient_Bar_Gold", Name: "Gold", Quantity: 4 },
      { ItemId: "Ingot_Palladium", Name: "Palladium", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Rose_Gold",
    Variant: "Light",
    Color: "#d38b7f",
    Inputs: [
      { ItemId: "Ingredient_Bar_Gold", Name: "Gold", Quantity: 4 },
      { ItemId: "Ingredient_Bar_Copper", Name: "Copper", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "White_Gold",
    Variant: "Light",
    Color: "#d7dbe2",
    Inputs: [
      { ItemId: "Ingredient_Bar_Gold", Name: "Gold", Quantity: 3 },
      { ItemId: "Ingot_Nickel", Name: "Nickel", Quantity: 1 },
      { ItemId: "Ingot_Palladium", Name: "Palladium", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Invar",
    Color: "#8e979f",
    Variant: "Light",
    Inputs: [
      { ItemId: "Ingredient_Bar_Iron", Name: "Iron", Quantity: 3 },
      { ItemId: "Ingot_Nickel", Name: "Nickel", Quantity: 2 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Cast_Iron",
    Variant: "Dark",
    Color: "#243443",
    Inputs: [
      { ItemId: "Ingredient_Bar_Iron", Name: "Iron", Quantity: 3 },
      { ItemId: "Ingot_Carbon", Name: "Carbon", Quantity: 1 },
      { ItemId: "Ingot_Silicon", Name: "Silicon", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Stainless_Steel",
    Variant: "Light",
    Color: "#9aa3ad",
    Inputs: [
      { ItemId: "Ingredient_Bar_Iron", Name: "Iron", Quantity: 3 },
      { ItemId: "Ingot_Chromium", Name: "Chromium", Quantity: 1 },
      { ItemId: "Ingot_Nickel", Name: "Nickel", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Wrought_Iron",
    Variant: "Dark",
    Color: "#1b2835",
    Inputs: [
      { ItemId: "Ingredient_Bar_Iron", Name: "Iron", Quantity: 4 },
      { ItemId: "Ingot_Silicon", Name: "Silicon", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Tool_Steel",
    Variant: "Dark",
    Color: "#172a37",
    Inputs: [
      { ItemId: "Ingredient_Bar_Iron", Name: "Iron", Quantity: 3 },
      { ItemId: "Ingot_Carbon", Name: "Carbon", Quantity: 1 },
      { ItemId: "Ingot_Chromium", Name: "Chromium", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Pewter",
    Variant: "Light",
    Color: "#9ea7b3",
    Inputs: [
      { ItemId: "Ingot_Tin", Name: "Tin", Quantity: 3 },
      { ItemId: "Ingot_Lead", Name: "Lead", Quantity: 1 },
      { ItemId: "Ingot_Antimony", Name: "Antimony", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Sterling_Silver",
    Variant: "Lightest",
    Color: "#d6dde6",
    Inputs: [
      { ItemId: "Ingredient_Bar_Silver", Name: "Silver", Quantity: 3 },
      { ItemId: "Ingot_Lead", Name: "Lead", Quantity: 2 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Nitinol",
    Variant: "Lightest",
    Color: "#b2bcc8",
    Inputs: [
      { ItemId: "Ingot_Nickel", Name: "Nickel", Quantity: 1 },
      { ItemId: "Ingot_Titanium", Name: "Titanium", Quantity: 1 }
    ],
    OutputQuantity: 2
  },
  {
    Id: "Permalloy",
    Variant: "Light",
    Color: "#5f8aa3",
    Inputs: [
      { ItemId: "Ingot_Nickel", Name: "Nickel", Quantity: 4 },
      { ItemId: "Ingredient_Bar_Iron", Name: "Iron", Quantity: 1 }
    ],
    OutputQuantity: 5
  },
  {
    Id: "Queens_Metal",
    Variant: "Light",
    Color: "#bfc8d2",
    Inputs: [
      { ItemId: "Ingot_Tin", Name: "Tin", Quantity: 2 },
      { ItemId: "Ingot_Antimony", Name: "Antimony", Quantity: 1 },
      { ItemId: "Ingot_Lead", Name: "Lead", Quantity: 1 },
      { ItemId: "Ingot_Bismuth", Name: "Bismuth", Quantity: 1 }
    ],
    OutputQuantity: 5
  }
]);

// export {
//   deriveEffectColors,
//   include,
//   join,
//   syncDir,
//   syncFile,
//   syncJson,
//   syncPublic,
//   syncTexture,
//   u,
//   uSep,
// };
