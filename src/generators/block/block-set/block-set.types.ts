import { type Prettify, type HasCommon, type HasId } from "@";

export interface HasBlockSet {
  /**
   * When true, all block types are included in the set.
   * Include/exclude filters are still applied on top of this.
   */
  includeAll?: boolean;

  /**
   * Specific block type IDs to include in the set, e.g. `["Rock_Stone", "Rock_Basalt"]`.
   * If null, no block type filter is applied.
   */
  includeBlockTypes?: string[] | null;

  /**
   * Specific block type IDs to exclude from the set, e.g. `["Rock_Gravel"]`.
   * Takes precedence over `includeBlockTypes`.
   */
  excludeBlockTypes?: string[] | null;

  /**
   * Block group names to include, e.g. `["Stone", "Wood"]`.
   * Groups are defined on the block's `BlockType.Group` property.
   */
  includeBlockGroups?: string[] | null;

  /**
   * Block group names to exclude from the set.
   * Takes precedence over `includeBlockGroups`.
   */
  excludeBlockGroups?: string[] | null;

  /**
   * Hitbox types to include. Filters blocks by their collision/hitbox configuration.
   */
  includeHitboxTypes?: string[] | null;

  /**
   * Hitbox types to exclude from the set.
   * Takes precedence over `includeHitboxTypes`.
   */
  excludeHitboxTypes?: string[] | null;

  /**
   * Creative menu category paths to include, e.g. `[["Blocks", "Rocks"]]`.
   * Each entry is a category path represented as an array of strings.
   */
  includeCategories?: string[][] | null;

  /**
   * Creative menu category paths to exclude from the set.
   * Takes precedence over `includeCategories`.
   */
  excludeCategories?: string[][] | null;
}

export type BlockSetCfg = Prettify<HasCommon & HasId & HasBlockSet>;
