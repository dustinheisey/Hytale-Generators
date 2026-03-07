import type { BuilderRecipeCfg, BuildingBlockCfg, NoId } from "#hg/index";
import { colors, include } from "#hg/index";

type BuildingBlock = BuildingBlockCfg & { builders?: NoId<BuilderRecipeCfg> };
type PaletteKey = "block" | "bricks" | "assortedBlock" | "assortedBricks" | "colorBlocks" | "colorBricks";

export const makeBuilding = (input: string, output: string): BuilderRecipeCfg => ({
  id: `${output}_From_${input[0].replace("$", "")}`,
  input,
  output
});

const makeBase = (
  icon: boolean,
  materialId: string,
  blockId: string,
  name: string
): Pick<BuildingBlockCfg, "id" | "icon" | "name" | "color" | "resourceType"> => ({
  id: blockId,
  name,
  icon,
  color: "#d83d05",
  resourceType: `${materialId}s`
});

export function palette(cfg: {
  id: string;
  icon: boolean;
  include?: PaletteKey[];
  exclude?: PaletteKey[];
}): BuildingBlock[] {
  const { id, icon } = cfg;

  return [
    ...(include(cfg, "block")
      ? [
          {
            ...makeBase(icon, id, `Block_${id}`, `${id} Block`),
            builders: makeBuilding(`Ingredient_Bar_${id}`, `Block_${id}`)
          }
        ]
      : []),
    ...(include(cfg, "bricks")
      ? [
          {
            ...makeBase(icon, id, `Bricks_${id}`, `${id} Bricks`),
            builders: makeBuilding(`$${id}s`, `Bricks_${id}`)
          }
        ]
      : []),
    ...(include(cfg, "assortedBlock")
      ? [
          {
            ...makeBase(icon, id, `Block_${id}_Assorted`, `Assorted ${id} Block`),
            builders: makeBuilding(`$${id}s`, `Block_${id}_Assorted`)
          }
        ]
      : []),
    ...(include(cfg, "assortedBricks")
      ? [
          {
            ...makeBase(icon, id, `Bricks_${id}_Assorted`, `Assorted ${id} Bricks`),
            builders: makeBuilding(`$${id}s`, `Bricks_${id}_Assorted`)
          }
        ]
      : []),
    ...(include(cfg, "colorBlocks")
      ? colors.map(color => ({
          ...makeBase(icon, id, `Block_${id}_${color}`, `${color} ${id} Block`),
          builders: makeBuilding(`$${id}s`, `Block_${id}_${color}`)
        }))
      : []),
    ...(include(cfg, "colorBricks")
      ? colors.map(color => ({
          ...makeBase(icon, id, `Bricks_${id}_${color}`, `${color} ${id} Bricks`),
          builders: makeBuilding(`$${id}s`, `Bricks_${id}_${color}`)
        }))
      : [])
  ];
}
