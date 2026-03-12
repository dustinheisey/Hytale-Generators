import {
  globals,
  type HasId,
  type HasLevel,
  type HasStack,
  type HasCategories,
  type Tab,
  type HasModel,
  type HasTexture,
  type HasTags,
  type HasItemBlock,
  type HasIcon,
  type IconProperties,
  withTranslationProperties,
  ifDefined,
  merge,
  parseTags
} from "#hg";

export const withLevel = ({ level }: HasLevel) => ifDefined([level], { itemLevel: level });

export const withStack = ({ stack }: HasStack) => ifDefined([stack], { maxStackSize: stack });

export const withDropOnDeath = { dropOnDeath: true };

export const withCategories = ({ categories }: HasCategories, fallback: Tab[]) => ({
  categories: categories ?? fallback
});

export const withPlayerAnimationsId = (type: "Block" | "Item") => ({ playerAnimationsId: type });

export const withItemSoundSetId = (iss: string) => ({ itemSoundSetId: iss });

export const withModel = ({ model }: HasModel, fallback: string) => ({ model: `${model ?? fallback}.blockymodel` });

export const withTexture = ({ id, texture }: HasId & HasTexture) => ({ texture: `${texture ?? id}.png` });

export const withIcon = ({ id, icon, iconGenerated }: HasId & HasIcon, group?: string, properties?: IconProperties) =>
  ifDefined([iconGenerated], {
    icon: icon ?? `${globals().paths.item.icon}/${group ? `${group}_` : ""}${id}.png`,
    iconProperties: properties
  });

export const withModelAndTexture = (cfg: HasModel & HasId & HasTexture, fallback: string) =>
  merge(withModel(cfg, fallback), withTexture(cfg));

export const withTags = ({ tags }: HasTags) => ifDefined(tags, { tags: parseTags(tags) });

export const withItemBlock = (cfg: HasItemBlock, group: string, categories: Tab[]) =>
  merge(
    withTags(cfg),
    withTranslationProperties(cfg),
    withLevel(cfg),
    withStack(cfg),
    withCategories(cfg, categories),
    withDropOnDeath,
    withPlayerAnimationsId("Block"),
    withItemSoundSetId("ISS_Blocks_Stone"),
    withModelAndTexture(cfg, group),
    withIcon(cfg, group, {
      scale: 0.58823,
      rotation: [22.5, 45, 22.5],
      translation: [0, -13.5]
    }),
    {
      itemEntity: {
        particleSystemId: undefined
      }
    }
  );
