import { globals, defined, merge, parseTags } from "@";
import {
  type HasCommon,
  type HasGroup,
  type HasIcon,
  type HasId,
  type HasLang,
  type HasName,
  type HasParent,
  type HasTags
} from "./generators.types";

export const withTranslation = ({ id, group, description }: HasId & HasGroup & HasLang) => {
  const base = `${globals().paths.item.langRoot}.${group ? `${group}_` : ""}${id}`;
  return {
    translationProperties: defined({
      name: `${base}.name`,
      description: description && `${base}.description`
    })
  };
};
export const withId = ({ id }: HasId) => ({ id });
export const withName = ({ name }: HasName) => ({ name });
export const withIcon = ({ icon, id, iconGenerated }: HasId & HasIcon, type: string) =>
  iconGenerated !== false ? { icon: `Icons/${type}/${icon ?? id}` } : {};
export const withParent = ({ parent }: HasParent) => defined({ parent });
export const withTags = ({ tags }: HasTags) => defined({ tags: tags && parseTags(tags) });
export const withCommon = (cfg: HasCommon) => merge(withParent(cfg), withTags(cfg));
