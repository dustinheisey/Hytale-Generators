import { type HasBlockSet } from "@";

export const withBlockSet = ({
  includeAll,
  includeBlockTypes,
  excludeBlockTypes,
  includeBlockGroups,
  excludeBlockGroups,
  includeHitboxTypes,
  excludeHitboxTypes,
  includeCategories,
  excludeCategories
}: HasBlockSet) => ({
  includeAll,
  includeBlockTypes,
  excludeBlockTypes,
  includeBlockGroups,
  excludeBlockGroups,
  includeHitboxTypes,
  excludeHitboxTypes,
  includeCategories,
  excludeCategories
});
