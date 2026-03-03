import type { HasId } from "../../../index.js";
import { builder, json } from "../../../index.js";

export interface HasBlockSet {
  includeAll?: boolean;
  includeBlockTypes?: string[] | null;
  excludeBlockTypes?: string[] | null;
  includeBlockGroups?: string[] | null;
  excludeBlockGroups?: string[] | null;
  includeHitboxTypes?: string[] | null;
  excludeHitboxTypes?: string[] | null;
  includeCategories?: string[][] | null;
  excludeCategories?: string[][] | null;
}
export type BlockSetCfg = HasId & HasBlockSet;

export const blockSet = builder({
  init: (id: string) => ({ id }),
  build: (cfg: BlockSetCfg) => {
    const { id, ...blockSetConfig } = cfg;
    json(`/Server/Item/Block/Sets/${id}`, blockSetConfig);
  }
});
