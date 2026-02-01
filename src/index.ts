import { syncJson, syncLang, syncPublic } from "./util/sync/sync.ts";
import { u } from "@text";
import { rename } from "./util/sync/syncLang.ts";
import { generateManifest } from "./content/manifest/manifest.ts";
import { generateCategories } from "./content/categories/categories.ts";
import { generateResourceType } from "./content/resource-type/resource-type.ts";
import { generateElement } from "./content/element/element.ts";
import { generateAlloy } from "./content/alloy/alloy.ts";
import { generateGem } from "./content/gem/gem.ts";

/*
- [ ] Step 1: generate list of alloys
- [ ] Step 2: generate list of gems
- [ ] Step 3: pick correct names for all things
- [ ] Step 3: pick correct colors for all elements
- [ ] Step 3: pick correct colors for all alloys
- [ ] Step 3: pick correct colors for all gems
- [ ] Step 3: pick correct color overrides for some ores
- [ ] step 7: fix things config requiring specific generators' types
*/

// ? Copy public folder contents to dist
syncPublic();

// ? Generate manifest file
generateManifest({
  group: "gg.inconvenient",
  name: "Unified Materials",
  version: "0.2.0",
  description: "Lots of materials for use in other mods",
  authors: [
    {
      name: "Inconvenient Dev",
      url: "https://inconvenient.gg",
    },
  ],
  website: "https://www.curseforge.com/hytale/mods/unified-materials",
});

// ? Generate creative categories file
generateCategories({
  id: "unified_materials",
  name: "Unified Materials",
  children: [
    "ores",
    "gems",
    "dusts",
    "ingots",
    "alloys",
  ],
});

// ? Generate resource type files
["dusts", "alloys"].forEach((type) => generateResourceType(type));

// ? Generate all gem files
const gems: GemConfig[] = [
  { id: "amber", color: "#A85A00" },
  { id: "amethyst", color: "#32114b", variant: "dark" },
  { id: "apatite", color: "#004AA8" },
  { id: "aquamarine", color: "#00424a" },
  { id: "bloodstone", color: "#780016", variant: "dark" },
  { id: "carnelian", color: "#8B2E1A" },
  { id: "citrine", color: "#B07F00" },
  { id: "diopside", color: "#15723f" },
  { id: "garnet", color: "#870012" },
  { id: "jade", color: "#007246" },
  { id: "lazurite", color: "#1A3F7A", variant: "dark" },
  { id: "moonstone", color: "#a1a7b8", variant: "light" },
  { id: "obsidian", color: "#170727", variant: "dark" },
  { id: "olivine", color: "#889533" },
  { id: "onyx", color: "#050505", variant: "dark" },
  { id: "opal", color: "#F4F1E8", variant: "light" },
  { id: "peridot", color: "#869e10" },
  { id: "rose_quartz", color: "#B76B7A" },
  { id: "sodalite", color: "#15224D", variant: "dark" },
  { id: "sunstone", color: "#c7610d" },
  { id: "tigers_eye", color: "#894d17", variant: "dark" },
  { id: "turquoise", color: "#007989" },
];

gems.forEach((gem) => generateGem(gem));

// ? Rename some ores
rename({
  iron: "hematite",
  copper: "malachite",
  silver: "acanthite",
  cobalt: "cobaltite",
});

// ? Generate all element kit files
const elements: ElementsConfig = {
  alkaliMetals: [
    { id: "lithium", color: "#FF5252", ores: { name: "Spodumene" } },
    { id: "sodium", color: "#FFD740", ores: { name: "Halite" } },
    { id: "potassium", color: "#E040FB", ores: { name: "Sylvite" } },
    { id: "rubidium", color: "#FF4081", ores: { name: "Lepidolite" } },
    { id: "caesium", color: "#7C4DFF", ores: { name: "Pollucite" } },
    { id: "francium", color: "#B71C1C" },
  ],
  alkalineEarthMetals: [
    { id: "beryllium", color: "#4CAF50", ores: { name: "Bertrandite" } },
    { id: "magnesium", color: "#8BC34A", ores: { name: "Magnesite" } },
    { id: "calcium", color: "#CDDC39", ores: { name: "Calcite" } },
    { id: "strontium", color: "#FFEB3B", ores: { name: "Celestite" } },
    { id: "barium", color: "#FFC107", ores: { name: "Barite" } },
    { id: "radium", color: "#FF9800" },
  ],
  transitionMetals: [
    { id: "scandium", color: "#00BCD4" },
    { id: "titanium", color: "#03A9F4", ores: { name: "Rutile" } },
    { id: "vanadium", color: "#2196F3", ores: { name: "Vanadinite" } },
    { id: "chromium", color: "#3F51B5", ores: { name: "Chromite" } },
    { id: "manganese", color: "#673AB7", ores: { name: "Pyrolusite" } },
    { id: "nickel", color: "#F44336", ores: { name: "Pentlandite" } },
    { id: "zinc", color: "#FF9800", ores: { name: "Sphalerite" } },
    { id: "yttrium", color: "#FFC107", ores: { name: "Xenotime" } },
    { id: "zirconium", color: "#FFEB3B", ores: { name: "Zircon" } },
    { id: "niobium", color: "#CDDC39", ores: { name: "Pyrochlore" } },
    { id: "molybdenum", color: "#8BC34A", ores: { name: "Molybdenite" } },
    { id: "technetium", color: "#4CAF50" },
    { id: "ruthenium", color: "#009688" },
    { id: "rhodium", color: "#00BCD4" },
    { id: "palladium", color: "#03A9F4" },
    { id: "cadmium", color: "#FF8A80" },
    { id: "hafnium", color: "#FF5252" },
    { id: "tantalum", color: "#E040FB", ores: { name: "Tantalite" } },
    { id: "tungsten", color: "#7C4DFF", ores: { name: "Wolframite" } },
    { id: "rhenium", color: "#536DFE" },
    { id: "osmium", color: "#448AFF" },
    { id: "iridium", color: "#40C4FF" },
    { id: "platinum", color: "#E0E0E0", ores: { name: "Ilmenite" } },
    { id: "gold", color: "#FFD700" },
    { id: "mercury", color: "#CFD8DC", ores: { name: "Cinnabar" } },
    { id: "rutherfordium", color: "#F06292" },
    { id: "dubnium", color: "#BA68C8" },
    { id: "seaborgium", color: "#9575CD" },
    { id: "bohrium", color: "#7986CB" },
    { id: "hassium", color: "#64B5F6" },
    { id: "meitnerium", color: "#4FC3F7" },
    { id: "darmstadtium", color: "#4DB6AC" },
    { id: "roentgenium", color: "#81C784" },
    { id: "copernicium", color: "#AED581" },
  ],
  postTransitionMetals: [
    { id: "aluminum", color: "#90A4AE", ores: { name: "Bauxite" } },
    { id: "gallium", color: "#DCE775" },
    { id: "indium", color: "#4DD0E1" },
    { id: "thallium", color: "#A1887F", ores: { name: "Lorandite" } },
    { id: "nihonium", color: "#FFB74D" },
    { id: "tin", color: "#9575CD", ores: { name: "Cassiterite" } },
    { id: "lead", color: "#455A64", ores: { name: "Galena" } },
    { id: "flerovium", color: "#FFD54F" },
    { id: "bismuth", color: "#FF80AB", ores: { name: "Bismuthinite" } },
    { id: "moscovium", color: "#BA68C8" },
    { id: "polonium", color: "#FFF176" },
    { id: "livermorium", color: "#81C784" },
  ],
  metalloids: [
    { id: "boron", color: "#8D6E63", ores: { name: "Borax" } },
    { id: "silicon", color: "#78909C", ores: { name: "Quartz" } },
    { id: "germanium", color: "#9E9E9E", ores: { name: "Germanite" } },
    { id: "arsenic", color: "#D4E157", ores: { name: "Arsenopyrite" } },
    { id: "antimony", color: "#CE93D8", ores: { name: "Stibnite" } },
    { id: "tellurium", color: "#F48FB1", ores: { name: "Tellurite" } },
  ],
  otherNonmetals: [
    { id: "hydrogen", color: "#B2EBF2" },
    {
      id: "carbon",
      color: "#37474F",
      ores: { name: "Graphite", description: "Can be processed into Carbon" },
    },
    { id: "nitrogen", color: "#C5CAE9" },
    { id: "phosphorus", color: "#FFCC80", ores: { name: "Apatite" } },
    { id: "oxygen", color: "#EF9A9A" },
    { id: "sulfur", color: "#FFF176" },
    { id: "selenium", color: "#80CBC4" },
  ],
  halides: [
    { id: "fluorine", color: "#E6EE9C", ores: { name: "fluorite" } },
    { id: "chlorine", color: "#CCFF90" },
    { id: "bromine", color: "#A5D6A7" },
    { id: "iodine", color: "#CE93D8" },
    { id: "astatine", color: "#8D6E63" },
    { id: "tennessine", color: "#4DB6AC" },
  ],
  nobleGases: [
    { id: "helium", color: "#FFF9C4" },
    { id: "neon", color: "#FFAB91" },
    { id: "argon", color: "#D1C4E9" },
    { id: "krypton", color: "#81D4FA" },
    { id: "xenon", color: "#90CAF9" },
    { id: "radon", color: "#BCAAA4" },
    { id: "oganesson", color: "#CFD8DC" },
  ],
  lanthanides: [
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
  ],
  actinides: [
    { id: "actinium", color: "#FCE4EC" },
    { id: "protactinium", color: "#F48FB1" },
    { id: "uranium", color: "#F06292", ores: { name: "Uraninite" } },
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
  ],
};

Object.values(elements).flat().forEach((element) => generateElement(element));

// ? Generate all alloy files
const alloys: AlloyConfig[] = [
  // Alnico — permanent magnets (motors, sensors, pickups); stays magnetic at higher temps than many magnets.
  {
    id: "alnico",
    variant: "dark",
    color: "#6b4a3a",
    inputs: [
      { ItemId: "Ingot_Iron", Quantity: 3 },
      { ItemId: "Ingot_Nickel", Quantity: 1 },
      { ItemId: "Ingot_Cobalt", Quantity: 1 },
    ],
    processingTime: 17,
    outputQuantity: 5,
  },

  // Duralumin — strong lightweight aluminum alloy for aircraft structures, rivets, machined parts.
  {
    id: "duralumin",
    variant: "lightest",
    color: "#b8c6d8",
    inputs: [
      { ItemId: "Ingot_Aluminum", Quantity: 3 },
      { ItemId: "Ingot_Copper", Quantity: 1 },
      { ItemId: "Ingot_Magnesium", Quantity: 1 },
    ],
    processingTime: 7,
    outputQuantity: 5,
  },

  // Bismanol — historic bismuth–manganese magnetic alloy used for specialized permanent magnets.
  {
    id: "bismanol",
    variant: "dark",
    color: "#344657",
    inputs: [
      { ItemId: "Ingot_Bismuth", Quantity: 1 },
      { ItemId: "Ingot_Manganese", Quantity: 1 },
    ],
    processingTime: 12,
    outputQuantity: 2,
  },

  // Rose metal — fusible alloy for low-temp casting/fixturing, tube-bending filler, temporary tooling.
  {
    id: "rose_metal",
    variant: "lightest",
    color: "#b9c2cb",
    inputs: [
      { ItemId: "Ingot_Bismuth", Quantity: 3 },
      { ItemId: "Ingot_Lead", Quantity: 1 },
      { ItemId: "Ingot_Tin", Quantity: 1 },
    ],
    processingTime: 6,
    outputQuantity: 5,
  },

  // Nichrome — resistance wire for heating elements and wirewound resistors.
  {
    id: "nichrome",
    variant: "light",
    color: "#9f9a87",
    inputs: [
      { ItemId: "Ingot_Nickel", Quantity: 4 },
      { ItemId: "Ingot_Chromium", Quantity: 1 },
    ],
    processingTime: 16,
    outputQuantity: 5,
  },

  // Ferrochrome — steelmaking additive that supplies chromium (especially for stainless steels).
  {
    id: "ferrochrome",
    color: "#586457",
    inputs: [
      { ItemId: "Ingot_Iron", Quantity: 2 },
      { ItemId: "Ingot_Chromium", Quantity: 3 },
    ],
    processingTime: 18,
    outputQuantity: 5,
  },

  // Megallium — cobalt–chromium–molybdenum dental alloy; corrosion resistant and nickel-free.
  {
    id: "megallium",
    color: "#466a7d",
    inputs: [
      { ItemId: "Ingot_Cobalt", Quantity: 3 },
      { ItemId: "Ingot_Chromium", Quantity: 1 },
      { ItemId: "Ingot_Molybdenum", Quantity: 1 },
    ],
    processingTime: 16,
    outputQuantity: 5,
  },

  // Talonite — wear/corrosion resistant cobalt alloy used for hard-wearing edges and abrasion service.
  {
    id: "talonite",
    variant: "dark",
    color: "#3c5b6e",
    inputs: [
      { ItemId: "Ingot_Cobalt", Quantity: 3 },
      { ItemId: "Ingot_Chromium", Quantity: 1 },
      { ItemId: "Ingot_Molybdenum", Quantity: 1 },
    ],
    processingTime: 16,
    outputQuantity: 5,
  },

  // Vitallium — cobalt–chromium–molybdenum alloy for implants/dentistry; strong and corrosion resistant.
  {
    id: "vitallium",
    color: "#4F8A73",
    inputs: [
      { ItemId: "Ingot_Cobalt", Quantity: 13 },
      { ItemId: "Ingot_Chromium", Quantity: 6 },
      { ItemId: "Ingot_Molybdenum", Quantity: 1 },
    ],
    processingTime: 16,
    outputQuantity: 2,
  },

  // Brass — fittings, valves, machinable parts, fasteners; general-purpose Cu–Zn alloy.
  {
    id: "brass",
    variant: "light",
    color: "#d6a33a",
    inputs: [
      { ItemId: "Ingot_Copper", Quantity: 2 },
      { ItemId: "Ingot_Zinc", Quantity: 1 },
    ],
    processingTime: 10,
    outputQuantity: 3,
  },

  // Bronze — bearings, springs, durable cast parts; classic Cu–Sn alloy.
  {
    id: "bronze",
    color: "#b06a2a",
    inputs: [
      { ItemId: "Ingot_Copper", Quantity: 3 },
      { ItemId: "Ingot_Tin", Quantity: 2 },
    ],
    processingTime: 11,
    outputQuantity: 5,
  },

  // Arsenical bronze — stronger casts / work-hardening copper alloy (historic + niche modern use).
  {
    id: "arsenical_bronze",
    color: "#9a6a3a",
    inputs: [
      { ItemId: "Ingot_Copper", Quantity: 3 },
      { ItemId: "Ingot_Arsenic", Quantity: 1 },
      { ItemId: "Ingot_Tin", Quantity: 1 },
    ],
    processingTime: 11,
    outputQuantity: 5,
  },

  // Bismuth bronze — lead-free-ish bearing/bushing alloy family; machinability + corrosion resistance.
  {
    id: "bismuth_bronze",
    color: "#a77b5a",
    inputs: [
      { ItemId: "Ingot_Copper", Quantity: 3 },
      { ItemId: "Ingot_Tin", Quantity: 1 },
      { ItemId: "Ingot_Bismuth", Quantity: 1 },
    ],
    processingTime: 11,
    outputQuantity: 5,
  },

  // Constanta — copper–nickel resistance alloy (constantan family) for thermocouples and precision resistors.
  {
    id: "constantan",
    variant: "light",
    color: "#b0a79b",
    inputs: [
      { ItemId: "Ingot_Copper", Quantity: 3 },
      { ItemId: "Ingot_Nickel", Quantity: 2 },
    ],
    processingTime: 14,
    outputQuantity: 5,
  },

  // Hepatizon — decorative dark “Corinthian bronze” style; prized for deep patina/ornamental metalwork.
  {
    id: "hepatizon",
    variant: "dark",
    color: "#3b2a3e",
    inputs: [
      { ItemId: "Ingot_Copper", Quantity: 3 },
      { ItemId: "Ingot_Gold", Quantity: 1 },
      { ItemId: "Ingot_Silver", Quantity: 1 },
    ],
    processingTime: 12,
    outputQuantity: 5,
  },

  // Galinsstan — galinstan liquid metal alloy used as a mercury alternative (heat transfer / novelty / lab use).
  {
    id: "galinsstan",
    variant: "lightest",
    color: "#d2dae5",
    inputs: [
      { ItemId: "Ingot_Gallium", Quantity: 3 },
      { ItemId: "Ingot_Indium", Quantity: 1 },
      { ItemId: "Ingot_Tin", Quantity: 1 },
    ],
    processingTime: 6,
    outputQuantity: 5,
  },

  // Electrum — gold–silver alloy (natural or made) used historically for coinage and decorative work.
  {
    id: "electrum",
    variant: "lightest",
    color: "#d9cf6a",
    inputs: [
      { ItemId: "Ingot_Gold", Quantity: 3 },
      { ItemId: "Ingot_Silver", Quantity: 2 },
    ],
    processingTime: 12,
    outputQuantity: 5,
  },

  // Purple gold — gold–aluminum intermetallic used in jewelry for vivid purple color (brittle, but real).
  {
    id: "purple_gold",
    color: "#7c4aa8",
    inputs: [
      { ItemId: "Ingot_Gold", Quantity: 4 },
      { ItemId: "Ingot_Aluminum", Quantity: 1 },
    ],
    processingTime: 12,
    outputQuantity: 5,
  },

  // Blue gold — gold–gallium (AuGa2) or gold–indium (AuIn2) intermetallic; used in specialty jewelry/inlays.
  {
    id: "blue_gold",
    color: "#2f63c7",
    inputs: [
      { ItemId: "Ingot_Gold", Quantity: 4 },
      { ItemId: "Ingot_Indium", Quantity: 1 },
    ],
    processingTime: 6,
    outputQuantity: 5,
  },

  // Gray gold — gold alloyed with “white” metals (often palladium) for a naturally gray/white tone under plating.
  {
    id: "gray_gold",
    color: "#b7ad9e",
    inputs: [
      { ItemId: "Ingot_Gold", Quantity: 4 },
      { ItemId: "Ingot_Palladium", Quantity: 1 },
    ],
    processingTime: 12,
    outputQuantity: 5,
  },

  // Rose gold — gold + copper (often with a little silver/zinc in real recipes) for warm pink tone (jewelry).
  {
    id: "rose_gold",
    variant: "light",
    color: "#d38b7f",
    inputs: [
      { ItemId: "Ingot_Gold", Quantity: 4 },
      { ItemId: "Ingot_Copper", Quantity: 1 },
    ],
    processingTime: 12,
    outputQuantity: 5,
  },

  // White gold — gold alloyed with nickel/palladium-family metals for a pale white tone (often rhodium plated).
  {
    id: "white_gold",
    variant: "light",
    color: "#d7dbe2",
    inputs: [
      { ItemId: "Ingot_Gold", Quantity: 3 },
      { ItemId: "Ingot_Nickel", Quantity: 1 },
      { ItemId: "Ingot_Palladium", Quantity: 1 },
    ],
    processingTime: 12,
    outputQuantity: 5,
  },

  // Invar — low thermal expansion Ni–Fe alloy for precision instruments, metrology frames, stable structures.
  {
    id: "invar",
    color: "#8e979f",
    variant: "light",
    inputs: [
      { ItemId: "Ingot_Iron", Quantity: 3 },
      { ItemId: "Ingot_Nickel", Quantity: 2 },
    ],
    processingTime: 16,
    outputQuantity: 5,
  },

  // Cast iron — castable iron–carbon alloy for engine blocks, machine bases, cookware, housings.
  {
    id: "cast_iron",
    variant: "dark",
    color: "#243443",
    inputs: [
      { ItemId: "Ingot_Iron", Quantity: 3 },
      { ItemId: "Ingot_Carbon", Quantity: 1 },
      { ItemId: "Ingot_Silicon", Quantity: 1 },
    ],
    processingTime: 16,
    outputQuantity: 5,
  },

  // Stainless steel — corrosion-resistant steel family (classic iron–chromium–nickel “austenitic” vibe).
  {
    id: "stainless_steel",
    variant: "light",
    color: "#9aa3ad",
    inputs: [
      { ItemId: "Ingot_Iron", Quantity: 3 },
      { ItemId: "Ingot_Chromium", Quantity: 1 },
      { ItemId: "Ingot_Nickel", Quantity: 1 },
    ],
    processingTime: 16,
    outputQuantity: 5,
  },

  // Wrought iron — very low-carbon forgeable iron used for decorative ironwork and restoration.
  {
    id: "wrought_iron",
    variant: "dark",
    color: "#1b2835",
    inputs: [
      { ItemId: "Ingot_Iron", Quantity: 4 },
      { ItemId: "Ingot_Silicon", Quantity: 1 },
    ],
    processingTime: 17,
    outputQuantity: 5,
  },

  // Tool steel — high hardness/wear steel for cutters, dies, punches, forming tooling.
  {
    id: "tool_steel",
    variant: "dark",
    color: "#172a37",
    inputs: [
      { ItemId: "Ingot_Iron", Quantity: 3 },
      { ItemId: "Ingot_Carbon", Quantity: 1 },
      { ItemId: "Ingot_Chromium", Quantity: 1 },
    ],
    processingTime: 17,
    outputQuantity: 5,
  },

  // Pewter — tin-based low-melt alloy for cast metalware, decorative parts, prototypes.
  {
    id: "pewter",
    variant: "light",
    color: "#9ea7b3",
    inputs: [
      { ItemId: "Ingot_Tin", Quantity: 3 },
      { ItemId: "Ingot_Lead", Quantity: 1 },
      { ItemId: "Ingot_Antimony", Quantity: 1 },
    ],
    processingTime: 6,
    outputQuantity: 5,
  },

  // Sterling silver — tougher silver alloy for jewelry, decorative hardware, some electrical contacts.
  {
    id: "sterling_silver",
    variant: "lightest",
    color: "#d6dde6",
    inputs: [
      { ItemId: "Ingot_Silver", Quantity: 3 },
      { ItemId: "Ingot_Lead", Quantity: 2 },
    ],
    processingTime: 11,
    outputQuantity: 5,
  },

  // Nitinol — nickel–titanium shape-memory/superelastic alloy for stents, actuators, couplings.
  {
    id: "nitinol",
    variant: "lightest",
    color: "#b2bcc8",
    inputs: [
      { ItemId: "Ingot_Nickel", Quantity: 1 },
      { ItemId: "Ingot_Titanium", Quantity: 1 },
    ],
    processingTime: 15,
    outputQuantity: 2,
  },

  // Permalloy — soft magnetic Ni–Fe alloy for magnetic shielding, transformer cores, sensors.
  {
    id: "permalloy",
    variant: "light",
    color: "#5f8aa3",
    inputs: [
      { ItemId: "Ingot_Nickel", Quantity: 4 },
      { ItemId: "Ingot_Iron", Quantity: 1 },
    ],
    processingTime: 16,
    outputQuantity: 5,
  },

  // Queens metal — tin-based pewter-family alloy used for cast wares; historically: 9 tin + 1 each antimony/lead/bismuth.
  {
    id: "queens_metal",
    variant: "light",
    color: "#bfc8d2",
    inputs: [
      { ItemId: "Ingot_Tin", Quantity: 2 },
      { ItemId: "Ingot_Antimony", Quantity: 1 },
      { ItemId: "Ingot_Lead", Quantity: 1 },
      { ItemId: "Ingot_Bismuth", Quantity: 1 },
    ],
    processingTime: 5,
  },
];

alloys.forEach((alloy) => generateAlloy(alloy));
