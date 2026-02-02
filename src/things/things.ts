export { generateAlloy, generateAlloys } from "./alloy/alloy.ts";
export { generateDust, generateDusts } from "./dust/dust.ts";
export { generateElement, generateElements } from "./element/element.ts";
export { generateGem, generateGems } from "./gem/gem.ts";
export { generateIngot, generateIngots } from "./ingot/ingot.ts";
export { generateOre, generateOres } from "./ore/ore.ts";
export { generateOreBlock, generateOreBlocks } from "./ore-block/ore-block.ts";

export const elements: ElementsConfig = {
  vanilla: [
    {
      id: "hematite",
      color: "#929291",
      dust: { name: "Iron" },
      exclude: ["ingot"],
    },
    {
      id: "malachite",
      color: "#2C7144",
      dust: { color: "#D08046", name: "Copper" },
      exclude: ["ingot"],
    },
    {
      id: "acanthite",
      color: "#EBE9EB",
      dust: { name: "Silver" },
      exclude: ["ingot"],
    },
    {
      id: "cobaltite",
      color: "#25476C",
      dust: { name: "Cobalt" },
      exclude: ["ingot"],
    },
    { id: "gold", color: "#F4CD25", exclude: ["ingot"] },
    { id: "thorium", color: "#2C7144", exclude: ["ingot"] },
  ],
  alkaliMetals: [
    {
      id: "lithium",
      color: "#B6B6E2",
      ores: { name: "Spodumene" },
    },
    {
      id: "sodium",
      color: "#e1eaff",
      ores: { name: "Halite" },
      ingot: { variant: "lightest" },
    },
    {
      id: "potassium",
      color: "#9DA6EB",
      ores: { name: "Sylvite" },
    },
    {
      id: "rubidium",
      color: "#9A93E5",
      ores: {
        name: "Lepidolite",
        description: "rubidium",
      },
    },
    {
      id: "caesium",
      color: "#E8C95A",
      ores: { name: "Pollucite" },
    },
    { id: "francium", color: "#6732D2" },
  ],
  alkalineEarthMetals: [
    {
      id: "beryllium",
      color: "#8CB1DD",
      ores: {
        name: "Bertrandite",
      },
    },
    {
      id: "magnesium",
      color: "#95B8F3",
      ores: {
        name: "Magnesite",
      },
    },
    {
      id: "calcium",
      color: "#C4D5EC",
      ores: { name: "Calcite" },
      ingot: { variant: "light" },
    },
    {
      id: "strontium",
      color: "#A89AE3",
      ores: {
        name: "Celestite",
      },
    },
    {
      id: "barium",
      color: "#E0CD77",
      ores: { name: "Barite" },
    },
    { id: "radium", color: "#4D4DD6" },
  ],
  transitionMetals: [
    { id: "scandium", color: "#88B2DC" },

    {
      id: "titanium",
      color: "#AEB6BF",
      ores: { name: "Rutile" },
      ingot: { variant: "light" },
    },
    {
      id: "vanadium",
      color: "#2a0651",
      ores: {
        name: "Vanadinite",
      },
      ingot: { variant: "dark" },
    },
    {
      id: "chromium",
      color: "#2B9A32",
      ores: { name: "Chromite" },
    },
    {
      id: "manganese",
      color: "#6B7076",
      ores: {
        name: "Pyrolusite",
      },
      ingot: { variant: "light" },
    },
    {
      id: "nickel",
      color: "#8A8570",
      ores: {
        name: "Pentlandite",
      },
    },
    {
      id: "zinc",
      color: "#9FA7B0",
      ores: { name: "Sphalerite" },
      ingot: { variant: "light" },
    },
    {
      id: "yttrium",
      color: "#7FB4EA",
      ores: { name: "Xenotime" },
    },
    {
      id: "zirconium",
      color: "#8ABAE6",
      ores: { name: "Zircon" },
    },
    {
      id: "niobium",
      color: "#3D87C1",
      ores: {
        name: "Pyrochlore",
      },
    },
    {
      id: "molybdenum",
      color: "#2D83C8",
      ores: {
        name: "Molybdenite",
      },
    },
    { id: "technetium", color: "#2D2DA1" },
    { id: "ruthenium", color: "#2C7DB5" },
    { id: "rhodium", color: "#86A6E0" },
    { id: "palladium", color: "#bd7018" },
    { id: "cadmium", color: "#5DB49C" },
    { id: "hafnium", color: "#7BAEE3" },
    {
      id: "tantalum",
      color: "#2C7EB4",
      ores: {
        name: "Tantalite",
      },
    },
    {
      id: "tungsten",
      color: "#503b27",
      ores: {
        name: "Wolframite",
      },
    },
    { id: "rhenium", color: "#1E568C" },
    { id: "osmium", color: "#1F3F5A" },
    { id: "iridium", color: "#646d7a", ingot: { variant: "light" } },
    {
      id: "platinum",
      color: "#D5DBE2",
      ores: { name: "Ilmenite" },
    },
    {
      id: "mercury",
      color: "#C9CCD1",
      ores: {
        name: "Cinnabar",
        color: "#B0120C",
      },
    },
    { id: "rutherfordium", color: "#1E5A93" },
    { id: "dubnium", color: "#1A4F8F" },
    { id: "seaborgium", color: "#17508F" },
    { id: "bohrium", color: "#4A1FB0" },
    { id: "hassium", color: "#164E7D" },
    { id: "meitnerium", color: "#16306A" },
    { id: "darmstadtium", color: "#1E5A7A" },
    { id: "roentgenium", color: "#7A2A2A" },
    { id: "copernicium", color: "#7B33D1" },
  ],
  postTransitionMetals: [
    {
      id: "aluminum",
      color: "#D0D6DE",
      ores: { name: "Bauxite" },
      ingot: { variant: "light" },
    },
    { id: "gallium", color: "#7EBBF1" },
    { id: "indium", color: "#7BBBE4" },
    {
      id: "thallium",
      color: "#8BAA1D",
      ores: {
        name: "Lorandite",
      },
    },
    { id: "nihonium", color: "#4A1BB0" },
    {
      id: "tin",
      color: "#A6AFB8",
      ores: { name: "Cassiterite" },
      ingot: { variant: "light" },
    },
    {
      id: "lead",
      color: "#44324e",
      ores: { name: "Galena" },
    },
    { id: "flerovium", color: "#2D63A1" },
    {
      id: "bismuth",
      color: "#7A667F",
      ores: {
        name: "Bismuthinite",
      },
    },
    { id: "moscovium", color: "#6A1F93" },
    { id: "polonium", color: "#2D3A47" },
    { id: "livermorium", color: "#7A1F6A" },
  ],
  metalloids: [
    {
      id: "boron",
      color: "#1F1F22",
      ores: { name: "Borax" },
    },
    {
      id: "silicon",
      color: "#5B616B",
      ores: { name: "Quartz" },
    },
    {
      id: "germanium",
      color: "#3535B0",
      ores: {
        name: "Germanite",
      },
    },
    {
      id: "arsenic",
      color: "#4C5056",
      ores: {
        name: "Arsenopyrite",
      },
    },
    {
      id: "antimony",
      color: "#3838AD",
      ores: { name: "Stibnite" },
    },
    {
      id: "tellurium",
      color: "#6A29B4",
      ores: {
        name: "Tellurite",
      },
    },
  ],
  otherNonmetals: [
    { id: "hydrogen", color: "#BFEFFF", ingot: { variant: "lightest" } },
    {
      id: "carbon",
      color: "#2A2A2A",
      ingot: { variant: "dark" },
      ores: { name: "Graphite" },
    },
    { id: "nitrogen", color: "#6A9BFF" },
    {
      id: "phosphorus",
      color: "#004AA8",
      ores: {
        name: "Apatite",
      },
    },
    { id: "oxygen", color: "#88FFFF" },
    { id: "sulfur", color: "#E0C000", ingot: { variant: "light" } },
    { id: "selenium", color: "#B01A1A" },
  ],
  halides: [
    {
      id: "fluorine",
      color: "#D6DF7A",
      ores: { name: "fluorite" },
      ingot: { variant: "light" },
    },
    { id: "chlorine", color: "#7DDE00" },
    { id: "bromine", color: "#8B1400" },
    { id: "iodine", color: "#3A004A" },
    { id: "astatine", color: "#2C2C88" },
    { id: "tennessine", color: "#4DB6AC" },
  ],
  nobleGases: [
    { id: "helium", color: "#EAD7FF" },
    { id: "neon", color: "#FF7AC7" },
    { id: "argon", color: "#CFE8FF" },
    { id: "krypton", color: "#8FB0FF" },
    { id: "xenon", color: "#6D8CFF" },
    { id: "radon", color: "#4D4DB0" },
    { id: "oganesson", color: "#2D2B47" },
  ],
  lanthanides: [
    { id: "lanthanum", color: "#B3D2F4" },
    { id: "cerium", color: "#A7E0C6" },
    { id: "praseodymium", color: "#7BE199" },
    { id: "neodymium", color: "#7BAEF4" },
    { id: "promethium", color: "#6D6578" },
    { id: "samarium", color: "#B9B9F0" },
    { id: "europium", color: "#7BC8E6" },
    { id: "gadolinium", color: "#6BB9DE" },
    { id: "terbium", color: "#5FD59B" },
    { id: "dysprosium", color: "#9DD45D" },
    { id: "holmium", color: "#7DD43B" },
    { id: "erbium", color: "#6BCB8C" },
    { id: "thulium", color: "#6B8FD4" },
    { id: "ytterbium", color: "#C5C5F0" },
    { id: "lutetium", color: "#B5E0B5" },
  ],
  actinides: [
    { id: "actinium", color: "#4D4DD6" },
    { id: "protactinium", color: "#2C7EB4" },
    {
      id: "uranium",
      color: "#657148",
      ores: { name: "Uraninite" },
    },
    { id: "neptunium", color: "#1E5A93" },
    { id: "plutonium", color: "#585E5A" },
    { id: "americium", color: "#2D2DA1" },
    { id: "curium", color: "#2C2C8C" },
    { id: "berkelium", color: "#17508F" },
    { id: "californium", color: "#4A1BB0" },
    { id: "einsteinium", color: "#16306A" },
    { id: "fermium", color: "#145E5E" },
    { id: "mendelevium", color: "#6A1F93" },
    { id: "nobelium", color: "#2D3A47" },
    { id: "lawrencium", color: "#2E2E71" },
  ],
};

export const gems: GemConfig[] = [
  { id: "amber", color: "#A85A00" },
  { id: "amethyst", color: "#32114b", variant: "dark" },
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

export const alloys: AlloyConfig[] = [
  // Alnico — permanent magnets (motors, sensors, pickups); stays magnetic at higher temps than many magnets.
  {
    id: "alnico",
    variant: "dark",
    color: "#6b4a3a",
    inputs: [
      { ItemId: "Ingredient_Bar_Iron", name: "Iron", Quantity: 3 },
      { ItemId: "Ingot_Nickel", name: "Nickel", Quantity: 1 },
      { ItemId: "Ingredient_Bar_Cobalt", name: "Cobalt", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Duralumin — strong lightweight aluminum alloy for aircraft structures, rivets, machined parts.
  {
    id: "duralumin",
    variant: "lightest",
    color: "#b8c6d8",
    inputs: [
      { ItemId: "Ingot_Aluminum", name: "Aluminum", Quantity: 3 },
      { ItemId: "Ingredient_Bar_Copper", name: "Copper", Quantity: 1 },
      { ItemId: "Ingot_Magnesium", name: "Magnesium", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Bismanol — historic bismuth–manganese magnetic alloy used for specialized permanent magnets.
  {
    id: "bismanol",
    variant: "dark",
    color: "#344657",
    inputs: [
      { ItemId: "Ingot_Bismuth", name: "Bismuth", Quantity: 1 },
      { ItemId: "Ingot_Manganese", name: "Manganese", Quantity: 1 },
    ],
    outputQuantity: 2,
  },

  // Rose metal — fusible alloy for low-temp casting/fixturing, tube-bending filler, temporary tooling.
  {
    id: "rose_metal",
    variant: "lightest",
    color: "#b9c2cb",
    inputs: [
      { ItemId: "Ingot_Bismuth", name: "Bismuth", Quantity: 3 },
      { ItemId: "Ingot_Lead", name: "Lead", Quantity: 1 },
      { ItemId: "Ingot_Tin", name: "Tin", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Nichrome — resistance wire for heating elements and wirewound resistors.
  {
    id: "nichrome",
    variant: "light",
    color: "#9f9a87",
    inputs: [
      { ItemId: "Ingot_Nickel", name: "Nickel", Quantity: 4 },
      { ItemId: "Ingot_Chromium", name: "Chromium", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Ferrochrome — steelmaking additive that supplies chromium (especially for stainless steels).
  {
    id: "ferrochrome",
    color: "#586457",
    inputs: [
      { ItemId: "Ingredient_Bar_Iron", name: "Iron", Quantity: 2 },
      { ItemId: "Ingot_Chromium", name: "Chromium", Quantity: 3 },
    ],
    outputQuantity: 5,
  },

  // Megallium — cobalt–chromium–molybdenum dental alloy; corrosion resistant and nickel-free.
  {
    id: "megallium",
    color: "#466a7d",
    inputs: [
      { ItemId: "Ingredient_Bar_Cobalt", name: "Cobalt", Quantity: 3 },
      { ItemId: "Ingot_Chromium", name: "Chromium", Quantity: 1 },
      { ItemId: "Ingot_Molybdenum", name: "Molybdenum", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Talonite — wear/corrosion resistant cobalt alloy used for hard-wearing edges and abrasion service.
  {
    id: "talonite",
    variant: "dark",
    color: "#3c5b6e",
    inputs: [
      { ItemId: "Ingredient_Bar_Cobalt", name: "Cobalt", Quantity: 3 },
      { ItemId: "Ingot_Chromium", name: "Chromium", Quantity: 1 },
      { ItemId: "Ingot_Molybdenum", name: "Molybdenum", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Vitallium — cobalt–chromium–molybdenum alloy for implants/dentistry; strong and corrosion resistant.
  {
    id: "vitallium",
    color: "#4F8A73",
    inputs: [
      { ItemId: "Ingredient_Bar_Cobalt", name: "Cobalt", Quantity: 13 },
      { ItemId: "Ingot_Chromium", name: "Chromium", Quantity: 6 },
      { ItemId: "Ingot_Molybdenum", name: "Molybdenum", Quantity: 1 },
    ],
    outputQuantity: 2,
  },

  // Brass — fittings, valves, machinable parts, fasteners; general-purpose Cu–Zn alloy.
  {
    id: "brass",
    variant: "light",
    color: "#d6a33a",
    inputs: [
      { ItemId: "Ingredient_Bar_Copper", name: "Copper", Quantity: 2 },
      { ItemId: "Ingot_Zinc", name: "Zinc", Quantity: 1 },
    ],
    outputQuantity: 3,
  },

  // Bronze — bearings, springs, durable cast parts; classic Cu–Sn alloy.
  {
    id: "bronze",
    color: "#b06a2a",
    inputs: [
      { ItemId: "Ingredient_Bar_Copper", name: "Copper", Quantity: 3 },
      { ItemId: "Ingot_Tin", name: "Tin", Quantity: 2 },
    ],
    outputQuantity: 5,
  },

  // Arsenical bronze — stronger casts / work-hardening copper alloy (historic + niche modern use).
  {
    id: "arsenical_bronze",
    color: "#9a6a3a",
    inputs: [
      { ItemId: "Ingredient_Bar_Copper", name: "Copper", Quantity: 3 },
      { ItemId: "Ingot_Arsenic", name: "Arsenic", Quantity: 1 },
      { ItemId: "Ingot_Tin", name: "Tin", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Bismuth bronze — lead-free-ish bearing/bushing alloy family; machinability + corrosion resistance.
  {
    id: "bismuth_bronze",
    color: "#a77b5a",
    inputs: [
      { ItemId: "Ingredient_Bar_Copper", name: "Copper", Quantity: 3 },
      { ItemId: "Ingot_Tin", name: "Tin", Quantity: 1 },
      { ItemId: "Ingot_Bismuth", name: "Bismuth", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Constantan — copper–nickel resistance alloy (constantan family) for thermocouples and precision resistors.
  {
    id: "constantan",
    variant: "light",
    color: "#b0a79b",
    inputs: [
      { ItemId: "Ingredient_Bar_Copper", name: "Copper", Quantity: 3 },
      { ItemId: "Ingot_Nickel", name: "Nickel", Quantity: 2 },
    ],
    outputQuantity: 5,
  },

  // Hepatizon — decorative dark “Corinthian bronze” style; prized for deep patina/ornamental metalwork.
  {
    id: "hepatizon",
    variant: "dark",
    color: "#3b2a3e",
    inputs: [
      { ItemId: "Ingredient_Bar_Copper", name: "Copper", Quantity: 3 },
      { ItemId: "Ingredient_Bar_Gold", name: "Gold", Quantity: 1 },
      { ItemId: "Ingredient_Bar_Silver", name: "Silver", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Galinsstan — galinstan liquid metal alloy used as a mercury alternative (heat transfer / novelty / lab use).
  {
    id: "galinsstan",
    variant: "lightest",
    color: "#d2dae5",
    inputs: [
      { ItemId: "Ingot_Gallium", name: "Gallium", Quantity: 3 },
      { ItemId: "Ingot_Indium", name: "Indium", Quantity: 1 },
      { ItemId: "Ingot_Tin", name: "Tin", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Electrum — gold–silver alloy (natural or made) used historically for coinage and decorative work.
  {
    id: "electrum",
    variant: "lightest",
    color: "#d9cf6a",
    inputs: [
      { ItemId: "Ingredient_Bar_Gold", name: "Gold", Quantity: 3 },
      { ItemId: "Ingredient_Bar_Silver", name: "Silver", Quantity: 2 },
    ],
    outputQuantity: 5,
  },

  // Purple gold — gold–aluminum intermetallic used in jewelry for vivid purple color (brittle, but real).
  {
    id: "purple_gold",
    color: "#7c4aa8",
    inputs: [
      { ItemId: "Ingredient_Bar_Gold", name: "Gold", Quantity: 4 },
      { ItemId: "Ingot_Aluminum", name: "Aluminum", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Blue gold — gold–gallium (AuGa2) or gold–indium (AuIn2) intermetallic; used in specialty jewelry/inlays.
  {
    id: "blue_gold",
    color: "#2f63c7",
    inputs: [
      { ItemId: "Ingredient_Bar_Gold", name: "Gold", Quantity: 4 },
      { ItemId: "Ingot_Indium", name: "Indium", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Gray gold — gold alloyed with “white” metals (often palladium) for a naturally gray/white tone under plating.
  {
    id: "gray_gold",
    color: "#b7ad9e",
    inputs: [
      { ItemId: "Ingredient_Bar_Gold", name: "Gold", Quantity: 4 },
      { ItemId: "Ingot_Palladium", name: "Palladium", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Rose gold — gold + copper (often with a little silver/zinc in real recipes) for warm pink tone (jewelry).
  {
    id: "rose_gold",
    variant: "light",
    color: "#d38b7f",
    inputs: [
      { ItemId: "Ingredient_Bar_Gold", name: "Gold", Quantity: 4 },
      { ItemId: "Ingredient_Bar_Copper", name: "Copper", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // White gold — gold alloyed with nickel/palladium-family metals for a pale white tone (often rhodium plated).
  {
    id: "white_gold",
    variant: "light",
    color: "#d7dbe2",
    inputs: [
      { ItemId: "Ingredient_Bar_Gold", name: "Gold", Quantity: 3 },
      { ItemId: "Ingot_Nickel", name: "Nickel", Quantity: 1 },
      { ItemId: "Ingot_Palladium", name: "Palladium", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Invar — low thermal expansion Ni–Fe alloy for precision instruments, metrology frames, stable structures.
  {
    id: "invar",
    color: "#8e979f",
    variant: "light",
    inputs: [
      { ItemId: "Ingredient_Bar_Iron", name: "Iron", Quantity: 3 },
      { ItemId: "Ingot_Nickel", name: "Nickel", Quantity: 2 },
    ],
    outputQuantity: 5,
  },

  // Cast iron — castable iron–carbon alloy for engine blocks, machine bases, cookware, housings.
  {
    id: "cast_iron",
    variant: "dark",
    color: "#243443",
    inputs: [
      { ItemId: "Ingredient_Bar_Iron", name: "Iron", Quantity: 3 },
      { ItemId: "Ingot_Carbon", name: "Carbon", Quantity: 1 },
      { ItemId: "Ingot_Silicon", name: "Silicon", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Stainless steel — corrosion-resistant steel family (classic iron–chromium–nickel “austenitic” vibe).
  {
    id: "stainless_steel",
    variant: "light",
    color: "#9aa3ad",
    inputs: [
      { ItemId: "Ingredient_Bar_Iron", name: "Iron", Quantity: 3 },
      { ItemId: "Ingot_Chromium", name: "Chromium", Quantity: 1 },
      { ItemId: "Ingot_Nickel", name: "Nickel", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Wrought iron — very low-carbon forgeable iron used for decorative ironwork and restoration.
  {
    id: "wrought_iron",
    variant: "dark",
    color: "#1b2835",
    inputs: [
      { ItemId: "Ingredient_Bar_Iron", name: "Iron", Quantity: 4 },
      { ItemId: "Ingot_Silicon", name: "Silicon", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Tool steel — high hardness/wear steel for cutters, dies, punches, forming tooling.
  {
    id: "tool_steel",
    variant: "dark",
    color: "#172a37",
    inputs: [
      { ItemId: "Ingredient_Bar_Iron", name: "Iron", Quantity: 3 },
      { ItemId: "Ingot_Carbon", name: "Carbon", Quantity: 1 },
      { ItemId: "Ingot_Chromium", name: "Chromium", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Pewter — tin-based low-melt alloy for cast metalware, decorative parts, prototypes.
  {
    id: "pewter",
    variant: "light",
    color: "#9ea7b3",
    inputs: [
      { ItemId: "Ingot_Tin", name: "Tin", Quantity: 3 },
      { ItemId: "Ingot_Lead", name: "Lead", Quantity: 1 },
      { ItemId: "Ingot_Antimony", name: "Antimony", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Sterling silver — tougher silver alloy for jewelry, decorative hardware, some electrical contacts.
  {
    id: "sterling_silver",
    variant: "lightest",
    color: "#d6dde6",
    inputs: [
      { ItemId: "Ingredient_Bar_Silver", name: "Silver", Quantity: 3 },
      { ItemId: "Ingot_Lead", name: "Lead", Quantity: 2 },
    ],
    outputQuantity: 5,
  },

  // Nitinol — nickel–titanium shape-memory/superelastic alloy for stents, actuators, couplings.
  {
    id: "nitinol",
    variant: "lightest",
    color: "#b2bcc8",
    inputs: [
      { ItemId: "Ingot_Nickel", name: "Nickel", Quantity: 1 },
      { ItemId: "Ingot_Titanium", name: "Titanium", Quantity: 1 },
    ],
    outputQuantity: 2,
  },

  // Permalloy — soft magnetic Ni–Fe alloy for magnetic shielding, transformer cores, sensors.
  {
    id: "permalloy",
    variant: "light",
    color: "#5f8aa3",
    inputs: [
      { ItemId: "Ingot_Nickel", name: "Nickel", Quantity: 4 },
      { ItemId: "Ingredient_Bar_Iron", name: "Iron", Quantity: 1 },
    ],
    outputQuantity: 5,
  },

  // Queens metal — tin-based pewter-family alloy used for cast wares; historically: 9 tin + 1 each antimony/lead/bismuth.
  {
    id: "queens_metal",
    variant: "light",
    color: "#bfc8d2",
    inputs: [
      { ItemId: "Ingot_Tin", name: "Tin", Quantity: 2 },
      { ItemId: "Ingot_Antimony", name: "Antimony", Quantity: 1 },
      { ItemId: "Ingot_Lead", name: "Lead", Quantity: 1 },
      { ItemId: "Ingot_Bismuth", name: "Bismuth", Quantity: 1 },
    ],
    outputQuantity: 5,
  },
];
