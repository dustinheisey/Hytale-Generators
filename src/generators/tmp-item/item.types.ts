// ─── Shared ──────────────────────────────────────────────────────────────────

/** RGB + brightness light emission, used on both items and blocks. */
export interface ColorLight {
  /** Red channel (0–255). */
  red?: number;
  /** Green channel (0–255). */
  green?: number;
  /** Blue channel (0–255). */
  blue?: number;
  /** Light intensity (0–15). 15 is maximum brightness. */
  brightness?: number;
}

/** A stat modifier entry applied to an entity stat. */
export interface StaticModifier {
  /** Which entity stat to modify (e.g. `"Damage"`, `"AttackSpeed"`). */
  type: string;
  /** Amount to modify the stat by. */
  value: number;
  /** How the modifier is applied. */
  calculationType?: "Additive" | "Multiplicative";
}

// ─── Translation ─────────────────────────────────────────────────────────────

/** Localization keys for item name and description. */
export interface ItemTranslationProperties {
  /** Translation key for the item's display name, e.g. `"items.stone_block.name"`. */
  name?: string;
  /** Translation key for the item's description tooltip, e.g. `"items.stone_block.description"`. */
  description?: string;
}

// ─── Icon ─────────────────────────────────────────────────────────────────────

/** Custom display properties for icon rendering in UI. */
export interface AssetIconProperties {
  /** Horizontal pixel offset. Positive moves right. */
  offsetX?: number;
  /** Vertical pixel offset. Positive moves down. */
  offsetY?: number;
  /** Scale multiplier. 1.0 is default size. */
  scale?: number;
  /** Rotation in degrees. Positive rotates clockwise. */
  rotation?: number;
}

// ─── Rendering ───────────────────────────────────────────────────────────────

/** Visual rendering configuration for the item in inventory, hand, and dropped state. */
export interface ItemRendering {
  /** Path to the 3D model asset, e.g. `"Items/Rock"`. Defaults to generic item model. */
  model?: string;
  /**
   * Scale multiplier for the item model.
   * @default 1.0
   */
  scale?: number;
  /**
   * Path to the texture asset applied to the 3D model.
   * @default "Items/Unknown.png"
   */
  texture?: string;
  /** Animation asset for the idle held-item animation. */
  animation?: string;
  /** Animation played when item is dropped on the ground. */
  droppedItemAnimation?: string;
  /**
   * Whether player hand animations drive the item display instead of item-specific animations.
   * @default false
   */
  usePlayerAnimations?: boolean;
  /** Particle effects displayed while holding the item. */
  particles?: object[];
  /** Particle effects visible only in first-person view. */
  firstPersonParticles?: object[];
  /** Trail effects that follow the item model. */
  trails?: object[];
  /** Light emitted by the held or dropped item. */
  light?: ColorLight;
}

// ─── Item Entity (Dropped) ───────────────────────────────────────────────────

/** Physics simulation properties for dropped items. */
export interface ItemPhysics {
  /** Physics mass. Affects fall speed and inertia. */
  mass?: number;
  /** Friction coefficient when sliding on surfaces (0–1 typical). */
  friction?: number;
  /** Whether gravity affects the dropped item. */
  applyGravity?: boolean;
}

/** Configuration for item behavior when dropped on the ground as an entity. */
export interface ItemEntityConfig {
  /** Physics simulation properties. */
  physics?: ItemPhysics;
  /**
   * Distance in blocks at which a player can pick up the dropped item.
   * @default 1.75
   */
  pickupRadius?: number;
  /** Seconds before item despawns if not picked up. */
  lifetime?: number;
  /**
   * Particle system asset displayed around dropped item.
   * @default "Item"
   */
  particleSystemId?: string;
  /** Hex color for particles (`#RRGGBB`). */
  particleColor?: string;
  /**
   * Whether to show particles around dropped items.
   * @default true
   */
  showItemParticles?: boolean;
}

// ─── Tool ────────────────────────────────────────────────────────────────────

/** Per-gather-type specification for a tool. */
export interface ItemToolSpec {
  /** Resource type this spec applies to (e.g. `"Rocks"`, `"Wood"`, `"Ore"`). */
  gatherType: string;
  /** Effectiveness on this gather type. Higher = faster and more efficient. */
  power: number;
  /** Quality level of this tool spec. Higher quality gathers better resources. */
  quality?: number;
  /** Whether this tool is incorrect for the material. Incorrect tools gather slower. */
  isIncorrect?: boolean;
  /** Sound effect when hitting this block type. */
  hitSoundLayer?: string;
}

/** Per-material durability loss configuration. */
export interface DurabilityLossBlockTypes {
  /** Specific block type IDs that cause durability loss. */
  blockTypes?: string[];
  /** Block set identifiers that cause durability loss. */
  blockSets?: string[];
  /** Durability consumed per hit on the specified blocks. */
  durabilityLossOnHit?: number;
}

/** Tool-specific configuration for gathering items like pickaxes, axes, and shovels. */
export interface ItemTool {
  /** Per-material tool specifications. */
  specs?: ItemToolSpec[];
  /** Speed multiplier for tool usage. 1.0 is normal. */
  speed?: number;
  /** Per-material durability loss settings. */
  durabilityLossBlockTypes?: DurabilityLossBlockTypes[];
  /** Default sound when tool hits blocks. */
  hitSoundLayer?: string;
  /** Sound played when tool hits an incorrect material. */
  incorrectMaterialSoundLayer?: string;
}

// ─── Weapon ──────────────────────────────────────────────────────────────────

/** Weapon-specific configuration for combat items. */
export interface ItemWeapon {
  /** Entity stat modifications applied when weapon is equipped. */
  statModifiers?: Record<string, StaticModifier[]>;
  /** Entity stats to remove when weapon is unequipped. */
  entityStatsToClear?: string[];
  /** Whether this weapon renders in both hands when equipped. */
  renderDualWielded?: boolean;
}

// ─── Armor ───────────────────────────────────────────────────────────────────

/** Armor-specific configuration for protection items. */
export interface ItemArmor {
  /** Which equipment slot this armor occupies. */
  armorSlot?: "Head" | "Chest" | "Hands" | "Legs";
  /** Base damage reduction as a fraction (0.2 = 20%). */
  baseDamageResistance?: number;
  /** Per-damage-type resistance modifiers. */
  damageResistance?: Record<string, StaticModifier[]>;
  /** Per-damage-type knockback resistance values. */
  knockbackResistances?: Record<string, number>;
  /** Entity stat modifications when armor is equipped. */
  statModifiers?: Record<string, StaticModifier[]>;
  /** Cosmetic items hidden when this armor is equipped. */
  cosmeticsToHide?: string[];
}

// ─── Glider ──────────────────────────────────────────────────────────────────

/** Glider-specific configuration for flight equipment. */
export interface ItemGlider {
  /** Maximum fall speed while gliding. Negative = downward. */
  terminalVelocity?: number;
  /** Rate at which fall speed increases while gliding. */
  fallSpeedMultiplier?: number;
  /** Rate at which horizontal speed increases while gliding. */
  horizontalSpeedMultiplier?: number;
  /** Base horizontal movement speed while gliding. */
  speed?: number;
}

// ─── Utility ─────────────────────────────────────────────────────────────────

/** Utility item configuration for consumables and misc items. */
export interface ItemUtility {
  /** Whether this item can be activated/used by the player. */
  usable?: boolean;
  /** Whether this item is compatible with other items for combination effects. */
  compatible?: boolean;
  /** Entity stat modifications while item is held. */
  statModifiers?: Record<string, StaticModifier[]>;
  /** Entity stats to remove when item is unequipped. */
  entityStatsToClear?: string[];
}

// ─── Block Type ──────────────────────────────────────────────────────────────

/** Per-face texture configuration for a block. */
export interface BlockTypeTextures {
  /** Single texture applied to all faces. */
  all?: string;
  /** Top (+Y) face texture. */
  up?: string;
  /** Bottom (-Y) face texture. */
  down?: string;
  /** North (-Z) face texture. */
  north?: string;
  /** South (+Z) face texture. */
  south?: string;
  /** East (+X) face texture. */
  east?: string;
  /** West (-X) face texture. */
  west?: string;
  /** Weight for random variant selection. Higher = selected more often. */
  weight?: number;
}

/** Behavior flags controlling usability and stacking. */
export interface BlockFlags {
  /** Whether the block can be interacted with. */
  isUsable?: boolean;
  /** Whether multiple blocks can occupy the same space. */
  isStackable?: boolean;
}

/** What drops when the block is broken. */
export interface BlockBreaking {
  /** Resource type gathered (e.g. `"Rocks"`, `"Wood"`). Determines valid tools. */
  gatherType?: string;
  /** Item ID that drops when the block is broken. */
  itemId?: string;
  /** Number of items dropped per break. */
  quantity?: number;
}

/** Block gathering configuration. */
export interface BlockGathering {
  /** Breaking/drop behavior. */
  breaking?: BlockBreaking;
}

/** Block-specific configuration for items that can be placed in the world. */
export interface BlockType {
  /** Block group for categorization and block sets (e.g. `"Stone"`, `"Wood"`). */
  group?: string;
  /** Physical material affecting collision. `"Empty"` = non-solid, `"Solid"` = blocks movement. */
  material?: "Empty" | "Solid";
  /** Rendering method. `"Cube"` = standard, `"Model"` = custom 3D model. */
  drawType?: "Empty" | "GizmoCube" | "Cube" | "Model" | "CubeWithModel";
  /** Transparency level affecting rendering and light propagation. */
  opacity?: "Solid" | "Transparent" | "Translucent";
  /** Textures for block faces. Multiple entries enable random variants. */
  textures?: BlockTypeTextures[];
  /** Path to custom 3D model. Used when `drawType` is `"Model"` or `"CubeWithModel"`. */
  customModel?: string;
  /**
   * Scale multiplier for the custom model.
   * @default 1.0
   */
  customModelScale?: number;
  /** Animation asset for the custom model. */
  customModelAnimation?: string;
  /** Hex color for block interaction particles (`#RRGGBB`). */
  particleColor?: string;
  /** Particle system spawned on block interaction. */
  blockParticleSetId?: string;
  /**
   * Sound set for block placement, breaking, and interaction.
   * @default "EMPTY"
   */
  blockSoundSetId?: string;
  /** Decal overlay asset for block breaking animation. */
  blockBreakingDecalId?: string;
  /** Light emitted by the block. */
  light?: ColorLight;
  /** Behavior flags. */
  flags?: BlockFlags;
  /** Gathering/drop configuration. */
  gathering?: BlockGathering;
}

// ─── Resource Types ───────────────────────────────────────────────────────────

/** Resource provided by this item when harvested or used. */
export interface ItemResourceType {
  /** Resource type identifier (e.g. `"Rock"`, `"Wood"`, `"Metal"`). */
  id: string;
  /** Amount of this resource provided. */
  quantity?: number;
}

// ─── Misc ─────────────────────────────────────────────────────────────────────

/** First-person arm pullback configuration when near obstacles. */
export interface ItemPullbackConfig {
  /** Distance in blocks at which pullback begins. */
  distance?: number;
  /** Speed of the pullback animation. */
  speed?: number;
}

/** Custom aiming reticle configuration. */
export interface ItemReticleConfig {
  /** Size of the aiming reticle. */
  size?: number;
  /** Hex color of the reticle (`#RRGGBB`). */
  color?: string;
}

// ─── Has* Interfaces ──────────────────────────────────────────────────────────

export interface HasItemId {
  id: string;
}
export interface HasTranslationProperties {
  translationProperties?: ItemTranslationProperties;
}
export interface HasIcon {
  icon?: string;
}
export interface HasIconProperties {
  iconProperties?: AssetIconProperties;
}
export interface HasItemCategories {
  categories?: string[];
}
export interface HasItemLevel {
  itemLevel?: number;
}
export interface HasMaxStack {
  maxStack?: number;
}
export interface HasItemQuality {
  quality?: string;
}
export interface HasItemSet {
  set?: string;
}
export interface HasPlayerAnimationsId {
  playerAnimationsId?: string;
}
export interface HasItemRendering {
  rendering?: ItemRendering;
}
export interface HasItemEntity {
  itemEntity?: ItemEntityConfig;
}
export interface HasSoundEventId {
  soundEventId?: string;
}
export interface HasItemSoundSet {
  itemSoundSetId?: string;
}
export interface HasItemTool {
  tool?: ItemTool;
}
export interface HasItemWeapon {
  weapon?: ItemWeapon;
}
export interface HasItemArmor {
  armor?: ItemArmor;
}
export interface HasItemGlider {
  glider?: ItemGlider;
}
export interface HasItemUtility {
  utility?: ItemUtility;
}
export interface HasBlockType {
  blockType?: BlockType;
}
export interface HasResourceTypes {
  resourceTypes?: ItemResourceType[];
}
export interface HasMaxDurability {
  maxDurability?: number;
}
export interface HasDurabilityLoss {
  durabilityLossOnHit?: number;
}
export interface HasFuelQuality {
  fuelQuality?: number;
}
export interface HasVariant {
  variant?: boolean;
}
export interface HasConsumable {
  consumable?: boolean;
}
export interface HasDropOnDeath {
  dropOnDeath?: boolean;
}
export interface HasClipsGeometry {
  clipsGeometry?: boolean;
}
export interface HasDeployablePreview {
  renderDeployablePreview?: boolean;
}
export interface HasInteractions {
  interactions?: Record<string, string>;
}
export interface HasInteractionConfig {
  interactionConfig?: { disabled?: boolean };
}
export interface HasInteractionVars {
  interactionVars?: Record<string, string>;
}
export interface HasAppearanceConditions {
  itemAppearanceConditions?: Record<string, object[]>;
}
export interface HasHUDStats {
  displayEntityStatsHUD?: string[];
}
export interface HasPullbackConfig {
  pullbackConfig?: ItemPullbackConfig;
}
export interface HasReticle {
  reticle?: ItemReticleConfig;
}
export interface HasBlockSelectorTool {
  blockSelectorTool?: object;
}
export interface HasBuilderTool {
  builderTool?: object;
}
export interface HasPortalKey {
  portalKey?: object;
}
export interface HasContainer {
  container?: object;
}

// ─── Root Item Config ─────────────────────────────────────────────────────────

/** Full configuration for a Hytale item asset. */
export type ItemCfg = HasItemId &
  HasTranslationProperties &
  HasIcon &
  HasIconProperties &
  HasItemCategories &
  HasItemLevel &
  HasMaxStack &
  HasItemQuality &
  HasItemSet &
  HasPlayerAnimationsId &
  HasItemRendering &
  HasItemEntity &
  HasSoundEventId &
  HasItemSoundSet &
  HasItemTool &
  HasItemWeapon &
  HasItemArmor &
  HasItemGlider &
  HasItemUtility &
  HasBlockType &
  HasResourceTypes &
  HasMaxDurability &
  HasDurabilityLoss &
  HasFuelQuality &
  HasVariant &
  HasConsumable &
  HasDropOnDeath &
  HasClipsGeometry &
  HasDeployablePreview &
  HasInteractions &
  HasInteractionConfig &
  HasInteractionVars &
  HasAppearanceConditions &
  HasHUDStats &
  HasPullbackConfig &
  HasReticle &
  HasBlockSelectorTool &
  HasBuilderTool &
  HasPortalKey &
  HasContainer;
