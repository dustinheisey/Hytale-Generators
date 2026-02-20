import type { BlockType, DustOptions, IngotOptions, OreBlockOptions, OreOptions } from "../../index.js";
import { blockTypes, dust, ingot, ore, oreBlock } from "../../index.js";

interface MetalOptions {
  id?: string;
  color?: string;
}

type BlockFilter = { include?: BlockType[]; exclude?: BlockType[] };

function selectBlockTypes(filter?: BlockFilter): BlockType[] {
  const include = filter?.include;
  const exclude = filter?.exclude;

  if (include?.length && exclude?.length) {
    throw new Error(`oreBlock options cannot have both "include" and "exclude". Pick one.`);
  }

  if (include?.length) {
    return include;
  }

  if (exclude?.length) {
    const ex = new Set(exclude);
    return blockTypes.filter(t => !ex.has(t));
  }

  return blockTypes;
}

export function metal(
  id: string,
  color: string,
  options?: {
    ores?: OreOptions & MetalOptions;
    oreBlock?: OreBlockOptions & MetalOptions & { include?: BlockType[]; exclude?: BlockType[] };
    ore?: OreOptions & MetalOptions;
    dust?: DustOptions & MetalOptions;
    ingot?: IngotOptions & MetalOptions;
  }
) {
  const { include, exclude, ...oreBlockOpts } = options?.oreBlock ?? {};
  for (const type of selectBlockTypes({ include, exclude })) {
    oreBlock(options?.oreBlock?.id ?? id, type, options?.oreBlock?.color ?? color, {
      ...options?.ores,
      ...oreBlockOpts
    });
  }

  ore(options?.ore?.id ?? id, options?.ore?.color ?? color, { ...options?.ores, ...options?.ore });
  dust(options?.dust?.id ?? id, options?.dust?.color ?? color, options?.dust);
  ingot(options?.ingot?.id ?? id, options?.ingot?.color ?? color, options?.ingot);
}
