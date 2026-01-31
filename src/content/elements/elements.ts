import { dust, ingot, ore, oreBlock } from "@data";
import { syncJson, syncTexture } from "@sync";
import { u } from "@text";

import { elements } from "../../configs/elements.ts";

export function generateElements(elements: ElementConfig[]) {
  elements.forEach((element) => {
    syncJson(
      `Ore_Blocks/Ore_${u(element.id)}_Stone`,
      oreBlock({ ...element, ...element?.oreBlock, type: "stone" }),
    );
    syncJson(
      `Ore_Blocks/Ore_${u(element.id)}_Basalt`,
      oreBlock({ ...element, ...element?.oreBlock, type: "basalt" }),
    );
    syncJson(
      `Ore_Blocks/Ore_${u(element.id)}_Sandstone`,
      oreBlock({ ...element, ...element?.oreBlock, type: "sandstone" }),
    );
    syncJson(
      `Ore_Blocks/Ore_${u(element.id)}_Shale`,
      oreBlock({ ...element, ...element?.oreBlock, type: "shale" }),
    );
    syncJson(
      `Ore_Blocks/Ore_${u(element.id)}_Slate`,
      oreBlock({ ...element, ...element?.oreBlock, type: "slate" }),
    );
    syncJson(
      `Ore_Blocks/Ore_${u(element.id)}_Volcanic`,
      oreBlock({ ...element, ...element?.oreBlock, type: "volcanic" }),
    );

    syncJson(
      `Ores/Ore_${u(element.id)}`,
      ore({ ...element, ...element?.ore }),
    );

    syncJson(
      `Dusts/Dust_${u(element.id)}`,
      dust({ ...element, ...element?.dust }),
    );

    syncJson(
      `Ingots/Ingot_${u(element.id)}`,
      ingot({ ...element, ...element?.ingot }),
    );

    syncTexture({
      inputFile: `src/textures/ore-mask.png`,
      color: element?.ores?.color || element.color,
      outputFile: `dist/Common/Resources/Ores/Ore_Textures/${
        u(element.id)
      }.png`,
    });

    syncTexture({
      inputFile: `assets/dust-mask.png`,
      color: element?.dust?.color || element.color,
      outputFile: `dist/Common/Resources/Materials/Dust_Textures/${
        u(element.id)
      }.png`,
    });

    syncTexture({
      inputFile: `assets/ingot-mask.png`,
      color: element?.ingot?.color || element.color,
      outputFile: `dist/Common/Resources/Materials/Ingot_Textures/${
        u(element.id)
      }.png`,
    });
  });
}

generateElements(elements);

export const test: ElementConfig[] = [
  { id: "osmium", color: "#448AFF", ores: { name: "Osmiridium" } },
  {
    id: "iridium",
    color: "#40C4FF",
    include: ["ingot", "gem", "ore_sandstone"],
  },
  { id: "platinum", color: "#E0E0E0", processingTime: 25 },
  {
    id: "aluminum",
    color: "#E0E0E0",
    ores: { name: "Bauxite", color: "#40C4FF" },
  },
];

export const reactiveNonmetals: ElementConfig[] = [
  { id: "hydrogen", color: "#B2EBF2" },
  { id: "helium", color: "#FFF9C4" },
  {
    id: "carbon",
    color: "#37474F",
    ores: { name: "Graphite", description: "Can be processed into Carbon" },
  },
  { id: "nitrogen", color: "#C5CAE9" },
  { id: "oxygen", color: "#EF9A9A" },
  { id: "fluorine", color: "#E6EE9C" },
  { id: "neon", color: "#FFAB91" },
  { id: "phosphorus", color: "#FFCC80" },
  { id: "sulfur", color: "#FFF176" },
  { id: "chlorine", color: "#CCFF90" },
  { id: "argon", color: "#D1C4E9" },
  { id: "selenium", color: "#80CBC4" },
  { id: "bromine", color: "#A5D6A7" },
  { id: "krypton", color: "#81D4FA" },
  { id: "iodine", color: "#CE93D8" },
  { id: "xenon", color: "#90CAF9" },
  { id: "astatine", color: "#8D6E63" },
  { id: "radon", color: "#BCAAA4" },
  { id: "tennessine", color: "#4DB6AC" },
  { id: "oganesson", color: "#CFD8DC" },
];

export const alkaliMetals: ElementConfig[] = [
  { id: "lithium", color: "#FF5252", ores: { name: "Spodumene" } },
  { id: "sodium", color: "#FFD740", ores: { name: "Halite" } },
  { id: "potassium", color: "#E040FB", ores: { name: "Sylvite" } },
  { id: "rubidium", color: "#FF4081", ores: { name: "Lepidolite" } },
  { id: "caesium", color: "#7C4DFF", ores: { name: "Pollucite" } },
  { id: "francium", color: "#B71C1C" },
];

export const alkalineEarthMetals: ElementConfig[] = [
  { id: "beryllium", color: "#4CAF50", ores: { name: "Bertrandite" } },
  { id: "magnesium", color: "#8BC34A", ores: { name: "Magnesite" } },
  { id: "calcium", color: "#CDDC39" },
  { id: "strontium", color: "#FFEB3B", ores: { name: "Celestite" } },
  { id: "barium", color: "#FFC107", ores: { name: "Barite" } },
  { id: "radium", color: "#FF9800" },
];

export const transitionMetals: ElementConfig[] = [
  { id: "scandium", color: "#00BCD4" },
  { id: "titanium", color: "#03A9F4" },
  { id: "vanadium", color: "#2196F3" },
  { id: "chromium", color: "#3F51B5" },
  { id: "manganese", color: "#673AB7" },
  { id: "iron", color: "#9C27B0" },
  { id: "cobalt", color: "#E91E63" },
  { id: "nickel", color: "#F44336" },
  { id: "copper", color: "#FF5722" },
  { id: "zinc", color: "#FF9800" },
  { id: "yttrium", color: "#FFC107" },
  { id: "zirconium", color: "#FFEB3B" },
  { id: "niobium", color: "#CDDC39" },
  { id: "molybdenum", color: "#8BC34A" },
  { id: "technetium", color: "#4CAF50" },
  { id: "ruthenium", color: "#009688" },
  { id: "rhodium", color: "#00BCD4" },
  { id: "palladium", color: "#03A9F4" },
  { id: "silver", color: "#B0BEC5" },
  { id: "cadmium", color: "#FF8A80" },
  { id: "hafnium", color: "#FF5252" },
  { id: "tantalum", color: "#E040FB" },
  { id: "tungsten", color: "#7C4DFF" },
  { id: "rhenium", color: "#536DFE" },
  { id: "osmium", color: "#448AFF" },
  { id: "iridium", color: "#40C4FF" },
  { id: "platinum", color: "#E0E0E0" },
  { id: "gold", color: "#FFD700" },
  { id: "mercury", color: "#CFD8DC" },
  { id: "rutherfordium", color: "#F06292" },
  { id: "dubnium", color: "#BA68C8" },
  { id: "seaborgium", color: "#9575CD" },
  { id: "bohrium", color: "#7986CB" },
  { id: "hassium", color: "#64B5F6" },
  { id: "meitnerium", color: "#4FC3F7" },
  { id: "darmstadtium", color: "#4DB6AC" },
  { id: "roentgenium", color: "#81C784" },
  { id: "copernicium", color: "#AED581" },
];

export const postTransitionMetals: ElementConfig[] = [
  { id: "aluminum", color: "#90A4AE" },
  { id: "gallium", color: "#DCE775" },
  { id: "indium", color: "#4DD0E1" },
  { id: "tin", color: "#9575CD" },
  { id: "thallium", color: "#A1887F" },
  { id: "lead", color: "#455A64" },
  { id: "bismuth", color: "#FF80AB" },
  { id: "nihonium", color: "#FFB74D" },
  { id: "flerovium", color: "#FFD54F" },
  { id: "moscovium", color: "#BA68C8" },
  { id: "livermorium", color: "#81C784" },
];

export const metalloids: ElementConfig[] = [
  { id: "boron", color: "#8D6E63" },
  { id: "silicon", color: "#78909C" },
  { id: "germanium", color: "#9E9E9E" },
  { id: "arsenic", color: "#D4E157" },
  { id: "antimony", color: "#CE93D8" },
  { id: "tellurium", color: "#F48FB1" },
  { id: "polonium", color: "#FFF176" },
];

export const lanthanides: ElementConfig[] = [
  { id: "lanthanum", color: "#E1F5FE" },
  { id: "cerium", color: "#B3E5FC" },
  { id: "praseodymium", color: "#81D4FA" },
  { id: "neodymium", color: "#4FC3F7" },
  { id: "promethium", color: "#29B6F6" },
  { id: "samarium", color: "#039BE5" },
  { id: "europium", color: "#0288D1" },
  { id: "gadolinium", color: "#0277BD" },
  { id: "terbium", color: "#01579B" },
  { id: "dysprosium", color: "#E8EAF6" },
  { id: "holmium", color: "#C5CAE9" },
  { id: "erbium", color: "#9FA8DA" },
  { id: "thulium", color: "#7986CB" },
  { id: "ytterbium", color: "#5C6BC0" },
  { id: "lutetium", color: "#3F51B5" },
];

export const actinides: ElementConfig[] = [
  { id: "actinium", color: "#FCE4EC" },
  { id: "thorium", color: "#F8BBD0" },
  { id: "protactinium", color: "#F48FB1" },
  { id: "uranium", color: "#F06292" },
  { id: "neptunium", color: "#EC407A" },
  { id: "plutonium", color: "#D81B60" },
  { id: "americium", color: "#AD1457" },
  { id: "curium", color: "#880E4F" },
  { id: "berkelium", color: "#E1BEE7" },
  { id: "californium", color: "#D1C4E9" },
  { id: "einsteinium", color: "#B39DDB" },
  { id: "fermium", color: "#9575CD" },
  { id: "mendelevium", color: "#7E57C2" },
  { id: "nobelium", color: "#673AB7" },
  { id: "lawrencium", color: "#512DA8" },
];

export const elements: ElementConfig[] = [
  ...reactiveNonmetals,
  ...alkaliMetals,
  ...alkalineEarthMetals,
  ...transitionMetals,
  ...postTransitionMetals,
  ...metalloids,
  ...lanthanides,
  ...actinides,
];
