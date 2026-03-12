export type Vector3d = number | { x: number; y: number; z: number };

export interface HasHitbox {
  min: Vector3d;
  max: Vector3d;
}
