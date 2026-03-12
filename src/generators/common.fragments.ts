import { globals, ifDefined, merge, parseTags, type HasGroup, type HasId, type HasName, type HasSimpleIcon } from "@";

export const withTranslationProperties = ({ group, id }: HasId & HasGroup) => {
  const { modId } = globals();
  return {
    translationProperties: {
      name: `server.items.${modId}.${group ? `${group}_` : ""}${id}.name`,
      description: `server.items.${modId}.${group ? `${group}_` : ""}${id}.description`
    }
  };
};

export const withName = ({ name }: HasName) => ({ name });

export const withId = ({ id }: HasId) => ({ id });

export const withSimpleIcon = ({ icon, id }: HasId & HasSimpleIcon, type: string) => ({
  icon: `Icons/${type}/${icon ?? id}`
});

interface HasParent {
  parent?: string;
}

interface HasTags {
  tags?: string | string[];
}

export type HasCommon = HasParent & HasTags;

export const withCommon = (cfg: HasCommon) => merge(withParent(cfg), withTags(cfg));

export const withParent = ({ parent }: HasParent) => ifDefined([parent], { parent });
export const withTags = ({ tags }: HasTags) => ifDefined([tags], { tags: parseTags(tags) });
