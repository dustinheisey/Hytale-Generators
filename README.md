# Hytale Generators

Utilities for generating Hytale server assets (JSON, language entries, textures, derived colors, and recipe definitions) into a `dist/` directory.

The generated `dist/` directory can be zipped and used directly as an asset pack (if it contains a valid `manifest.json`), or used to reduce repetitive asset editor work when developing packs or plugins.

All operations are file-system based and write to `dist/`.

---

## What This Library Provides

- File-safe JSON generation
- Language file synchronization
- Texture tinting
- Effect color derivation
- Crafting and processing recipe builders
- Shared global configuration
- Utilities for string and ingredient formatting

---

## Table of Contents

- [Installation](#installation)
- [Example Project Structure](#example-project-structure)
- [Global Configuration](#global-configuration)
  - [Extending `GlobalConfig`](#extending-globalconfig)
- [Copying Public Assets](#copying-public-assets)
- [Writing JSON Files](#writing-json-files)
- [Language File (`server.lang`)](#language-file-serverlang)
- [Texture Generation](#texture-generation)
- [Effect Color Derivation](#effect-color-derivation)
- [String & Ingredient Utilities](#string--ingredient-utilities)
- [Creating Your Own Generator](#creating-your-own-generator)
- [Built-in Generators](#built-in-generators)
  - [Manifest](#manifest)
  - [Resource Types](#resource-types)
  - [Categories](#categories)
  - [Crafting Recipes](#crafting-recipes)
  - [Processing Recipes](#processing-recipes)
  - [Items](#item-generators)

---

## Installation

```bash
npm install hytale-generators
```

---

## Example Project Structure

```text
scripts/
├─ public/                            # (optional) copied to dist/Common/
│  ├─ Icons/
│  │  ├─ ResourceTypes/
│  │  └─ ItemCategories/
│  └─ ...
├─ assets/                            # (optional) mask textures used for tinting
│  └─ ...
├─ generators/                        # your custom generator functions
│  └─ ...
├─ dist/                              # generated output
├─ index.ts                           # entrypoint: setGlobal + run generators
├─ global.d.ts                        # (optional) module augmentation for GlobalConfig
├─ package.json
└─ tsconfig.json
```

---

## Global Configuration

All projects must call `setGlobal()` before running generators.

At minimum, `modId` must be defined.

```ts
import { setGlobal } from "hytale-generators";

setGlobal({
  modId: "my_mod"
});
```

Access inside generators:

```ts
import { global } from "hytale-generators";

const id = global().modId;
```

If `setGlobal()` was not called, `global()` throws an error.

### `GlobalConfig` Definition

```ts
export interface GlobalConfig {
  modId: string;
}
```

### Extending `GlobalConfig`

`GlobalConfig` can be extended using TypeScript module augmentation.

You can place the augmentation in:

- A dedicated `global.d.ts` file **or**
- Directly in your main entry file (`index.ts`) **or**
- Any `.ts` file included in your `tsconfig.json`

Example:

```ts
import "hytale-generators";

declare module "hytale-generators" {
  interface GlobalConfig {
    customProperty: string;
  }
}
```

Then:

```ts
setGlobal({
  modId: "my_mod",
  customProperty: "value"
});

const value = global().customProperty;
```

### Notes

- The module name **must exactly match** the package import name (`"hytale-generators"`).
- You only need to define the augmentation once per project.
- Extended properties are fully type-checked and provide autocomplete.

---

## Copying Public Assets

Copies:

```
public/
```

to:

```
dist/Common/
```

### Example

```ts
import { syncPublic } from "hytale-generators";

syncPublic();
```

If `public/` does not exist, nothing happens.

---

## Writing JSON Files

### `syncJson`

Writes an object to:

```
dist/<path>.json
```

### Example

```ts
import { syncJson } from "hytale-generators";

syncJson("Server/Item/MyItem", {
  Id: "MyItem",
  Value: 10
});
```

Output:

```
dist/Server/Item/MyItem.json
```

Parent directories are created automatically.

---

## Language File (`server.lang`)

### `syncLang`

Updates:

```
dist/Server/Languages/en-US/server.lang
```

### Example

```ts
import { global, syncLang } from "hytale-generators";

syncLang([
  {
    key: `items.${global().modId}.Example_Item.name`,
    value: "Example"
  }
]);
```

Behavior:

- Existing keys are replaced
- Missing keys are appended
- Comments and unrelated lines are preserved

---

## Texture Generation

### `syncTexture`

Generates a texture by tinting a greyscale mask texture with a hex color.

```ts
import { syncTexture } from "hytale-generators";

syncTexture({
  color: "#FF0000",
  inputFile: "assets/base.png",
  outputFile: "dist/Icons/red.png"
});
```

Behavior:

- Validates hex color
- Applies tint using `sharp`
- Writes output file
- Creates parent directories automatically

---

## Effect Color Derivation

### `deriveEffectColors`

Generates three derived colors from a base hex.

```ts
import { deriveEffectColors } from "hytale-generators";

const effects = deriveEffectColors("#3366FF");
```

Returns:

```ts
{
  light: "#XXXXXX",
  interact: "#XXXXXX",
  sparks: "#XXXXXX"
}
```

Behavior:

- Validates hex format
- Uses OKLCH adjustments via `culori`

---

## String & Ingredient Utilities

### `uSep`

Capitalizes words while preserving underscores.

```ts
uSep("my_item"); // "My_Item"
```

### `u`

Capitalizes words and replaces underscores with spaces.

```ts
u("my_item_name"); // "My Item Name"
```

### `join`

Formats arrays into natural language.

```ts
join(["A", "B", "C"]); // "A, B and C"
```

### `parseIngredient`

Parses ingredient strings.

```ts
parseIngredient("3x Iron_Ingot");
// { ItemId: "Iron_Ingot", Quantity: 3 }

parseIngredient("Iron_Ingot");
// { ItemId: "Iron_Ingot", Quantity: 1 }
```

---

## Creating Your Own Generator

A generator is a function that writes files using the provided helpers.

Generators can:

- Write JSON (`syncJson`)
- Update language (`syncLang`)
- Generate textures (`syncTexture`)
- Use global config (`global()`)

Example:

```ts
import { global, resourceType, salvage, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
import type { CommonTypes, ItemBlockTypes, ItemData, MaskVariant } from "../item/item.types.js";

export type OreData = Required<Pick<ItemData, CommonTypes | ItemBlockTypes> & { PlayerAnimationsId: "Block" }>;

export interface OreOptions {
  name?: string;
  baseName?: string;
  description?: string;
  categories?: Tab[];
  model?: string;
  mask?: string;
  maskVariant?: MaskVariant;
  texture?: string;
  textureOut?: string;
  level?: number;
  maxStack?: number;
}

export function ore(id: string, color: string, options?: OreOptions) {
  const modId = global().modId;

  syncJson<OreData>(
    `Server/Item/Items/Ores/Ore${id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Ore${id}.name`,
        description: `server.items.${modId}.Ore${id}.description`
      },
      categories: options?.categories ?? ["Blocks.Ores"],
      model: `Resources/Ores/${options?.model ?? "Ore_Large"}.blockymodel`,
      texture: `Resources/Ores/${options?.texture ?? id}.png`,
      itemLevel: options?.level ?? 10,
      playerAnimationsId: "Block" as const,
      iconProperties: {
        scale: 0.58823,
        rotation: [22.5, 45, 22.5],
        translation: [0, -13.5]
      },
      tags: {
        type: ["Ore"]
      },
      itemEntity: {
        particleSystemId: undefined
      },
      maxStack: options?.maxStack ?? 100,
      itemSoundSetId: "ISS_Blocks_Stone",
      dropOnDeath: true
    })
  );

  salvage(`Ore${id}FromSalvage`, `$Salvage${id}`, `Ore${id}`, 4);

  syncLang([
    {
      key: `items.${modId}.Ore${id}.name`,
      value: options?.name ?? `${options?.baseName ?? id} Ore`
    },
    {
      key: `items.${modId}.Ore${id}.description`,
      value:
        options?.description ??
        `Can be processed into an <b>${id} Ingot</b> at a <b>Furnace</b>, or ground into <b>${id} Dust</b> at a <b>Salvager's Workbench</b>`
    }
  ]);

  syncTexture({
    color: color,
    inputFile: options?.mask ?? `assets/ore/ore-mask-${options?.maskVariant ?? "base"}.png`,
    outputFile: options?.textureOut ?? `dist/Common/Resources/Ores/${id}.png`
  });

  resourceType(`Salvage${id}`, "Rock");
}
```

There is no enforced structure. Generators are plain functions that call helpers.

---

## Built-in Generators

The library provides default generators for common vanilla JSON schemas. These are optional utilities.

### Manifest

Writes a `manifest.json` at the root of `dist/`.

```ts
import { manifest } from "hytale-generators";

manifest({
  Group: "Example",
  Name: "MyMod",
  Version: "1.0.0",
  Description: "Example mod",
  Authors: [{ Name: "Author" }],
  Website: "https://example.com"
});
```

Output:

```text
dist/manifest.json
```

---

### Resource Types

Creates a resource type JSON under `dist/Server/Item/ResourceTypes/`.

```ts
import { resourceType } from "hytale-generators";

resourceType("MyResource", "MyIcon");
```

Output:

```text
dist/Server/Item/ResourceTypes/MyResource.json
```

---

### Categories

Creates a category definition and updates the language file entries used by UI.

```ts
import { categories } from "hytale-generators";

categories({
  icon: "MyIcon",
  name: "My Category",
  order: 0,
  children: ["ItemA", { id: "ItemB", name: "Custom Name", icon: "CustomIcon" }]
});
```

Output:

```text
dist/Server/Item/Category/CreativeLibrary/<modId>.json
dist/Server/Languages/en-US/server.lang
```

Notes:

- Namespacing is based on `global().modId`
- Each child generates a `Name` key of the form `server.ui.<modId>.<childId>`

---

### Crafting Recipes

All crafting helpers write a recipe JSON file at the path you pass as `id` (under `dist/`), and populate the correct bench + category format.

Inputs support quantities using the format `"3x ItemId"`.

#### `arcane`

```ts
import { arcane } from "hytale-generators";

arcane("Server/Recipe/PortalRecipe", "Portals", "2x Arcane_Dust", "Portal_Core", 5);
```

Output:

```text
dist/Server/Recipe/PortalRecipe.json
```

#### `alchemy`

```ts
import { alchemy } from "hytale-generators";

alchemy("Server/Recipe/HealthPotion", "Alchemy_Potions", ["2x Herb", "Water_Bottle"], "Health_Potion", 6, 1);
```

Output:

```text
dist/Server/Recipe/HealthPotion.json
```

#### `weapon`

```ts
import { weapon } from "hytale-generators";

weapon("Server/Recipe/IronSword", "Weapon_Sword", ["2x Iron_Ingot", "Stick"], "Iron_Sword", 8, 1);
```

Output:

```text
dist/Server/Recipe/IronSword.json
```

#### `workbench`

```ts
import { workbench } from "hytale-generators";

workbench("Server/Recipe/WoodPlank", "Workbench_Survival", "Wood_Log", "4x Wood_Plank", 3, 1);
```

Output:

```text
dist/Server/Recipe/WoodPlank.json
```

#### `loom`

```ts
import { loom } from "hytale-generators";

loom("Server/Recipe/Cloth", "3x Fiber", "Cloth", 4);
```

Output:

```text
dist/Server/Recipe/Cloth.json
```

#### `furniture`

```ts
import { furniture } from "hytale-generators";

furniture("Server/Recipe/WoodChest", "Furniture_Storage", "8x Wood_Plank", "Wood_Chest", 6, 1);
```

Output:

```text
dist/Server/Recipe/WoodChest.json
```

#### `farming`

```ts
import { farming } from "hytale-generators";

farming("Server/Recipe/WheatSeeds", "Seeds", "Wheat", "2x Wheat_Seeds", 2, 1);
```

Output:

```text
dist/Server/Recipe/WheatSeeds.json
```

#### `cooking`

```ts
import { cooking } from "hytale-generators";

cooking("Server/Recipe/Bread", "Baked", "3x Wheat", "Bread", 5, 1);
```

Output:

```text
dist/Server/Recipe/Bread.json
```

#### `armor`

```ts
import { armor } from "hytale-generators";

armor("Server/Recipe/IronHelmet", "Armor_Head", "5x Iron_Ingot", "Iron_Helmet", 8, 1);
```

Output:

```text
dist/Server/Recipe/IronHelmet.json
```

---

### Processing Recipes

Processing helpers write a recipe JSON file at the path you pass as `id` (under `dist/`), and populate the correct processing bench requirement.

Inputs support quantities using the format `"3x ItemId"`.

#### `salvage`

```ts
import { salvage } from "hytale-generators";

salvage("Server/Recipe/SalvageSword", "Iron_Sword", ["2x Iron_Ingot", "Stick"], 4);
```

Output:

```text
dist/Server/Recipe/SalvageSword.json
```

#### `tannery`

```ts
import { tannery } from "hytale-generators";

tannery("Server/Recipe/Leather", "Animal_Hide", "Leather", 6, 1);
```

Output:

```text
dist/Server/Recipe/Leather.json
```

#### `furnace`

```ts
import { furnace } from "hytale-generators";

furnace("Server/Recipe/SmeltIron", "Iron_Ore", "Iron_Ingot", 6, 1);
```

Output:

```text
dist/Server/Recipe/SmeltIron.json
```

#### `campfire`

```ts
import { campfire } from "hytale-generators";

campfire("Server/Recipe/CookedMeat", "Raw_Meat", "Cooked_Meat", 4);
```

Output:

```text
dist/Server/Recipe/CookedMeat.json
```

Here’s a drop-in docs expansion you can paste into your README under **Built-in Generators** (or add a new section like **Item Generators**). I wrote it to match your existing style: what it does, what it writes, and the important options—especially **mask / maskVariant / textureOut**.

---

## Item Generators

The library also provides “item generators” that create common item families (ores, ore blocks, ingots, dusts, gems, alloys) with:

- `syncJson(...)` for item definitions
- `syncLang(...)` for name/description
- `syncTexture(...)` for tinted textures from greyscale mask images
- optional recipe helpers (`furnace`, `salvage`, etc.)

These are optional utilities you can use directly, or as reference patterns for writing your own generators.

### Texture masks and variants

Many generators support generating textures from a mask:

- `mask`: an explicit file path to a greyscale mask image (**always wins**)
- `maskVariant` / `variant`: picks a default mask file path when `mask` is not provided
- `textureOut`: override the output texture path (defaults to a sensible `dist/Common/...` target)

Example pattern:

```ts
syncTexture({
  color,
  inputFile: options?.mask ?? `assets/<kind>/<kind>-mask-${options?.maskVariant ?? "base"}.png`,
  outputFile: options?.textureOut ?? `dist/Common/Resources/<Kind>/${id}.png`
});
```

You’re expected to provide mask images locally (not included in this repo). Keeping masks out of the public repository avoids redistributing game assets.

---

## Ores

### `ore(id, color, options?)`

Creates an ore **item** (not the block-in-world variant) and generates a tinted ore texture.

Writes:

- `dist/Server/Item/Items/Ores/Ore<id>.json`
- language keys in `dist/Server/Languages/en-US/server.lang`
- `dist/Common/Resources/Ores/<id>.png` (tinted from mask)

Also creates:

- a salvage recipe: `Ore<id>FromSalvage`
- a resource type: `Salvage<id>`

Example:

```ts
ore("Copper", "#C8743B", {
  baseName: "Copper",
  maskVariant: "base",
  level: 10
});
```

Options:

- `name`: full override for display name
- `baseName`: overrides the `id` portion in the generated name (`${baseName ?? id} Ore`)
- `description`: full override for description
- `categories`: defaults to `["Blocks.Ores"]`
- `model`: defaults to `"Ore_Large"`
- `texture`: output texture reference inside the JSON (`Resources/Ores/<...>.png`)
- `textureOut`: where the generated PNG is written in `dist/`
- `mask`: explicit mask path
- `maskVariant`: selects a mask (`assets/ore/ore-mask-<variant>.png`)
- `level`: sets `itemLevel` (defaults to `10`)
- `maxStack`: defaults to `100`

---

## Ore Blocks

### `oreBlock(id, blockType, color, options?)`

Creates an ore **block item** for each base rock type (Stone, Shale, Basalt, etc.). This is the in-world block variant.

Writes:

- `dist/Server/Item/Items/OreBlocks/OreBlock<id><BlockType>.json`
- language keys in `server.lang`

Example:

```ts
blockTypes.forEach(type => {
  oreBlock("Copper", type, "#C8743B", {
    baseName: "Copper",
    drops: ["OreCopper", "Rock_Stone_Cobble"]
  });
});
```

Options:

- `name`: full override for display name
- `baseName`: overrides id portion (`${baseName ?? id} Ore - ${type}`)
- `description`: optional description key (only written if provided)
- `categories`: defaults to `["Blocks.Ores"]`
- `model`: defaults to `"Ore_Large"`
- `texture`: texture id used by the block model (`Resources/Ores/<...>.png`)
- `drops`: optional explicit drop list; defaults to dropping `Ore<id><type>` plus cobble

---

## Ingots

### `ingot(id, color, options?)`

Creates an ingot item, generates a tinted ingot texture, and creates furnace recipes from ore and dust.

Writes:

- `dist/Server/Item/Items/Ingots/Ingot<id>.json`
- language keys
- `dist/Common/Resources/Ingots/<id>.png`

Also creates:

- furnace recipe `<id>IngotFromOre`
- furnace recipe `<id>IngotFromDust`

Example:

```ts
ingot("Copper", "#C8743B", {
  baseName: "Copper",
  variant: "medium",
  time: 14
});
```

Options:

- `name`: full override (`"${name}"`)
- `baseName`: overrides id portion (`${baseName ?? id} Ingot`)
- `description`: optional description key (only written if provided)
- `variant`: selects ingot mask (`assets/ingot/ingot-mask-<variant>.png`)
- `mask`: explicit mask path
- `textureOut`: output PNG path in dist
- `time`: furnace time for recipes (defaults to `14`)
- `categories`, `model`, `texture`, `level`, `maxStack` (as in other generators)

---

## Dusts

### `dust(id, color, options?)`

Creates a dust item and generates a tinted dust texture.

Writes:

- `dist/Server/Item/Items/Dusts/Dust<id>.json`
- language keys
- `dist/Common/Resources/Dusts/<id>.png`

Example:

```ts
dust("Copper", "#C8743B", {
  baseName: "Copper",
  mask: "assets/dust/dust-mask.png"
});
```

Options:

- `name`: full override
- `baseName`: overrides id portion (`${baseName ?? id} Dust`)
- `description`: full override (defaults to “processed into an <id> Ingot”)
- `categories`: defaults to `["Items"]`
- `model`: defaults to `"Dust"`
- `mask`: explicit mask path (defaults to `assets/dust/dust-mask.png`)
- `textureOut`, `maxStack`, etc.

---

## Gems

### `gem(id, color, options?)`

Creates a gem **block item** with light/particles and generates a tinted gem texture. Also derives effect colors from the base `color` for light/particles.

Writes:

- `dist/Server/Item/Items/Gems/Gem<id>.json`
- language keys (name always; description only if provided)
- `dist/Common/Resources/Gems/<id>.png`

Example:

```ts
gem("Ruby", "#D63C3C", {
  variant: "light",
  model: "Gem"
});
```

Options:

- `variant`: selects gem mask (`assets/gem/gem-mask-<variant>.png`)
- `mask`: explicit mask path
- `name`: defaults to `id`
- `description`: optional (only written if provided)
- `categories`: defaults to `["Blocks.Ores"]`
- `model`, `texture`, `textureOut`, `level`, `maxStack`

Note: `gem(...)` uses `deriveEffectColors(color)` to set block light color and particle colors.

---

## Alloys

### `alloy(id, color, inputs, options?)`

Creates an alloy ingot item, generates a tinted texture, and creates a furnace recipe that consumes the input ingots and outputs `2x Alloy<id>`.

Writes:

- `dist/Server/Item/Items/Alloys/Alloy<id>.json`
- language keys
- `dist/Common/Resources/Alloys/<id>.png`

Also creates:

- furnace recipe `Alloy<id>FromIngots`

Example:

```ts
alloy(
  "Bronze",
  "#B07C3A",
  [
    { id: "IngotCopper", name: "Copper" },
    { id: "IngotTin", name: "Tin" }
  ],
  {
    baseName: "Bronze",
    maskVariant: "base"
  }
);
```

Options:

- `name`: full override (`${name}`)
- `baseName`: used for generated name (currently `${baseName ?? id} Ingot`)
- `description`: defaults to `Alloy of <A and B>` via `join(...)`
- `categories`, `model`, `texture`, `textureOut`
- `mask` / `maskVariant` (defaults to `assets/ingot/ingot-mask-<variant>.png`)
- `maxStack`

---

## Metal

### `metal(id, color, options?)`

Convenience generator that creates a full “metal set”:

- ore blocks for each base rock type
- ore item
- dust item
- ingot item

Example:

```ts
metal("Copper", "#C8743B", {
  ores: { level: 10 }, // shared options
  ore: { maskVariant: "base" }, // per-generator overrides
  dust: { baseName: "Copper" },
  ingot: { variant: "medium", time: 14 }
});
```

Options shape:

```ts
{
  ores?: OreOptions & { id?: string; color?: string };
  oreBlock?: OreBlockOptions & { id?: string; color?: string };
  ore?: OreOptions & { id?: string; color?: string };
  dust?: DustOptions & { id?: string; color?: string };
  ingot?: IngotOptions & { id?: string; color?: string };
}
```

Notes:

- `ores` is merged into `oreBlock` and `ore` options (shared defaults)
- Each sub-generator can override `id` and `color` independently

---
