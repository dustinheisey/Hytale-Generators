import type { Prettify } from "@/api/util/types";
import type { HasCommon } from "../common.fragments";
import type { HasId, HasItemEntity } from "@";

export type HasQuality = Prettify<{
  /** Define the value of the quality to order them, 0 being the lowest quality. */
  value?: number;
  texture?:
    | string
    | {
        /** The path to the texture of the item tooltip. It has to be located in Common/UI/ItemQualities/Tooltips. */
        tooltip?: string;
        /** The path to the texture of the item tooltip arrow. It has to be located in Common/UI/ItemQualities/Tooltips. */
        arrow?: string;
        slot?:
          | string
          | {
              /** The path to the texture of the item slot. It has to be located in Common/UI/ItemQualities/Slots. */
              slot?: string;
              /** The path to the texture of the item slot, if it has an associated block type. It has to be located in Common/UI/ItemQualities/Slots. */
              block?: string;
              /** The path to the texture of the item slot used when RenderSpecialSlot is true and the item is consumable or usable. It has to be located in Common/UI/ItemQualities/Slots. */
              special?: string;
            };
      };
  /** The color that'll be used to display the text of the item in the inventory. */
  color?: string;
  /** The localization key for the item quality name. */
  localizationKey?: string;
  /** To specify the quality label should be displayed in the tooltip. */
  hideLabel?: boolean;
  /** To specify if we display a special slot texture if the item is a consumable or usable. */
  special?: boolean;
  /** Provides an ItemEntityConfig used for all items with their item quality set to this asset unless overridden by an ItemEntityConfig defined on the item itself. */
  itemEntityConfig?: HasItemEntity["itemEntity"];
  particleParent?: "common" | "epic" | "legendary" | "rare" | "uncommon";
  /** Whether this item is hidden from typical public search, like the creative library */
  hidden?: boolean;
}>;

export type QualityCfg = HasCommon & HasId & HasQuality;
