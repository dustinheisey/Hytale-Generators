import { isNumber } from "@hg";
import type { HasHitbox } from "./hitbox.types.js";

export const withHitbox = ({ min, max }: HasHitbox) => ({
  boxes: [
    {
      min: isNumber(min) ? { x: min, y: min, z: min } : min,
      max: isNumber(max) ? { x: max, y: max, z: max } : max
    }
  ]
});
