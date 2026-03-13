import { isString, u, type HasId } from "@";
import type { HasQuality } from "./quality.types";

const tooltip = `UI/ItemQualities/Tooltips`;
const slot = `UI/ItemQualities/Slots`;

export const computeTexture = (type: string, id: string, texture: HasQuality["texture"]) => {
  switch (type) {
    case "tooltip":
      return texture
        ? isString(texture)
          ? `${tooltip}/ItemTooltip${texture}.png`
          : `${tooltip}/ItemTooltip${texture.tooltip ?? id}.png`
        : `${tooltip}/ItemTooltip${id}.png`;
    case "arrow":
      return texture
        ? isString(texture)
          ? `${tooltip}/ItemTooltip${texture}Arrow.png`
          : `${tooltip}/ItemTooltip${texture.arrow ?? id}Arrow.png`
        : `${tooltip}/ItemTooltip${id}Arrow.png`;
    case "slot":
      return texture
        ? isString(texture)
          ? `${slot}/Slot${texture}.png`
          : isString(texture.slot)
            ? `${slot}/Slot${texture.slot}.png`
            : `${slot}/Slot${texture.slot?.slot ?? id}.png`
        : `${slot}/Slot${id}.png`;
    case "block":
      return texture
        ? isString(texture)
          ? `${slot}/Slot${texture}.png`
          : isString(texture.slot)
            ? `${slot}/Slot${texture.slot}.png`
            : `${slot}/Slot${texture.slot?.block ?? id}Block.png`
        : `${slot}/Slot${id}.png`;
    case "special":
      return texture
        ? isString(texture)
          ? `${slot}/Slot${texture}.png`
          : isString(texture.slot)
            ? `${slot}/Slot${texture.slot}.png`
            : `${slot}/Slot${texture.slot?.special ?? id}Special.png`
        : `${slot}/Slot${id}.png`;
    default:
      return "";
  }
};

export const withQuality = ({
  id,
  value,
  color,
  hidden,
  texture,
  special,
  hideLabel,
  particleParent
}: HasId & HasQuality) => {
  return {
    QualityValue: value,
    ItemTooltipTexture: computeTexture("tooltip", id, texture),
    ItemTooltipArrowTexture: computeTexture("arrow", id, texture),
    SlotTexture: computeTexture("slot", id, texture),
    BlockSlotTexture: computeTexture("block", id, texture),
    SpecialSlotTexture: computeTexture("special", id, texture),
    TextColor: color,
    LocalizationKey: `server.general.qualities.${id}`,
    VisibleQualityLabel: hideLabel ?? true,
    RenderSpecialSlot: special,
    hideFromSearch: hidden,
    ItemEntityConfig: {
      ParticleSystemId: `Drop_${u(particleParent ?? "common")}`
    }
  };
};
