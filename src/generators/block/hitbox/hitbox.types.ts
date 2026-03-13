import { type Prettify, type HasCommon, type HasId } from "@";

/**
 * A 3D vector, either as a uniform value applied to all axes,
 * or as explicit x, y, z components.
 * @example 1 // uniform: x=1, y=1, z=1
 * @example { x: 1, y: 2, z: 3 }
 */
export type Vector3d = number | { x: number; y: number; z: number };

/**
 * Defines an axis-aligned bounding box using two corner points.
 */
export interface HasHitbox {
  /** The minimum corner of the bounding box (bottom-back-left). */
  min: Vector3d;
  /** The maximum corner of the bounding box (top-front-right). */
  max: Vector3d;
}

export type HitboxCfg = Prettify<HasCommon & HasId & HasHitbox>;
