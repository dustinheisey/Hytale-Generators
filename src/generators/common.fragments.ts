import { globals, type HasGroup, type HasId, type HasName, type HasSimpleIcon } from "@";

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
