import type { Builder } from "hytale-generators";
import { builder, isNumber, json } from "hytale-generators";

export type Vector3d = number | { x: number; y: number; z: number };

export interface HitboxCfg {
  id: string;
  min: Vector3d;
  max: Vector3d;
}

export const hitbox: Builder<HitboxCfg> = builder((cfg: HitboxCfg) => {
  const { id, min, max } = cfg;
  if (typeof min === "number")
    if (isNumber(min))
      json(`Server/Item/Block/Hitboxes/${id}`, {
        boxes: [
          {
            min: isNumber(min) ? { x: min, y: min, z: min } : min,
            max: isNumber(max) ? { x: max, y: max, z: max } : max
          }
        ]
      });
});
