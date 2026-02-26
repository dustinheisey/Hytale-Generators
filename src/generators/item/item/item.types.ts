import type { AutoComplete } from "../../../index.js";

/** Derived from `hytale-item-schema.json` (https://gist.github.com/Huijiro/fe069677c25d58edb5beaab917f760a4)
 * Complete JSON Schema for Hytale Item asset configuration with comprehensive documentation including full Java package references, field mappings, and enumeration details. All properties are documented with line numbers and source code references.
 */
export interface ItemData {
  Id: ItemIdentifier;
  TranslationProperties?: TranslationProperties;
  Icon?: ItemIconAsset;
  Categories?: Tab[];
  IconProperties?: IconDisplayProperties;
  ItemLevel?: ItemLevel;
  MaxStack?: MaximumStackSize;
  Quality?: ItemQualityTier;
  Set?: AssetSetName;
  Model?: Item3DModel;
  Texture?: string;
  PlayerAnimationsId?: PlayerAnimationSet;
  Rendering?: ItemRenderingConfiguration;
  ItemEntity?: DroppedItemConfiguration;
  SoundEventId?: PickupSoundEvent;
  ItemSoundSetId?: ItemSoundSet;
  Tool?: ToolConfiguration;
  Weapon?: WeaponConfiguration;
  Armor?: ArmorConfiguration;
  Glider?: GliderConfiguration;
  Utility?: UtilityConfiguration;
  BlockType?: BlockConfiguration;
  ResourceTypes?: ResourceTypes;
  MaxDurability?: MaximumDurability;
  DurabilityLossOnHit?: DurabilityLossPerUse;
  FuelQuality?: FuelQuality;
  Variant?: IsVariantItem;
  Consumable?: IsConsumable;
  DropOnDeath?: DropOnPlayerDeath;
  ClipsGeometry?: ClipsThroughGeometry;
  RenderDeployablePreview?: ShowDeployablePreview;
  Interactions?: InteractionDefinitions;
  InteractionConfig?: InteractionConfiguration;
  InteractionVars?: InteractionVariables;
  ItemAppearanceConditions?: ConditionalAppearance;
  DisplayEntityStatsHUD?: StatsToDisplayInHUD;
  PullbackConfig?: FirstPersonPullback;
  Reticle?: AimingReticle;
  BlockSelectorTool?: BlockSelectorTool;
  BuilderTool?: BuilderTool;
  PortalKey?: PortalKey;
  Container?: ContainerConfiguration;
  Tags?: Tags;
}

export type CommonTypes = "TranslationProperties" | "Categories" | "MaxStack";

export type ItemTypes =
  | "Model"
  | "Texture"
  | "IconProperties"
  | "DropOnDeath"
  | "ItemEntity"
  | "ItemSoundSetId"
  | "ResourceTypes"
  | "Tags";

export type ItemBlockTypes = Exclude<ItemTypes, "ResourceTypes">;

export type BlockTypes = "BlockType" | "ItemSoundSetId" | "Tags";

export type Tags = {
  Type?: string[];
  Family?: string[];
  Material?: string[];
};

/**
 *
 * Unique identifier for this item asset. Must be globally unique, alphanumeric with underscores only. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#id (protected String, line 299). This field serves as the primary key used by the game engine for all item lookups and references throughout the system.
 */
export type ItemIdentifier = string;
/**
 * Translation key for the item's display name. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemTranslationProperties#name (protected String, line 26). Key should reference i18n localization file entries.
 */
export type ItemNameTranslationKey = string;
/**
 * Translation key for the item's description text. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemTranslationProperties#description (protected String, line 28). Key should reference i18n localization file entries for tooltip text.
 */
export type ItemDescriptionTranslationKey = string;
/**
 * Path to the item icon image asset used in inventory UI and creative menu. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#icon (protected String, line 300). Recommended size 64x64 pixels, PNG format. Icon is displayed in inventory, hotbar, and item tooltips.
 */
export type ItemIconAsset = string;
/**
 * Categories this item appears in within the creative menu and item library. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#categories (protected String[], line 329). Categories are hierarchical and determine menu organization for player browsing.
 */
export type Tab = AutoComplete<
  | "Items"
  | "Items.Tools"
  | "Items.Weapons"
  | "Items.Armors"
  | "Items.Foods"
  | "Items.Potions"
  | "Items.Recipes"
  | "Items.Ingredients"
  | "Tool.BuilderTool"
  | "Tool.BuilderToolSecondPage"
  | "Tool.ScriptedBrushes"
  | "Tool.Block"
  | "Tool.BrushFilters"
  | "Tool.Machinima"
  | "Blocks.Rocks"
  | "Blocks.Structural"
  | "Blocks.Soils"
  | "Blocks.Ores"
  | "Blocks.Plants"
  | "Blocks.Fluids"
  | "Blocks.Portals"
  | "Blocks.Deco"
  | "Furniture.Benches"
  | "Furniture.Containers"
  | "Furniture.Furniture"
  | "Furniture.Doors"
  | "Furniture.Lighting"
  | "Furniture.Beds"
  | "Furniture.Shelves"
  | "Furniture.Signs"
>;
/**
 * Horizontal offset for icon rendering in pixels. Maps to AssetIconProperties#offsetX. Positive values move icon right, negative left.
 */
export type IconXOffset = number;
/**
 * Vertical offset for icon rendering in pixels. Maps to AssetIconProperties#offsetY. Positive values move icon down, negative up.
 */
export type IconYOffset = number;
/**
 * Scale multiplier for icon size. Maps to AssetIconProperties#scale. Value of 1.0 is default size, 2.0 is double size, 0.5 is half size.
 */
export type IconScale = number;
/**
 * Rotation angle in degrees. Maps to AssetIconProperties#rotation. Positive values rotate clockwise.
 */
export type IconRotation = number[];

export type IconTranslation = number[];
/**
 * Item level for progression and equipment systems. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#itemLevel (protected int, line 305). Higher levels typically indicate better gear for advanced players.
 */
export type ItemLevel = number;
/**
 * Maximum number of this item that can stack in a single inventory slot. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#maxStack (protected int, line 306, default -1). Affects inventory management and storage capacity.
 */
export type MaximumStackSize = number;
/**
 * Quality tier or rarity level of the item. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#qualityId (protected String, line 307). Quality affects item appearance in UI and progression tier.
 */
export type ItemQualityTier = string;
/**
 * Name of the asset set this item belongs to. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#set (protected String, line 330). Set groups related items together (e.g., 'Rock_Stone', 'Tool_Iron', 'Armor_Diamond') for organized asset management.
 */
export type AssetSetName = string;
/**
 * Animation set identifier for how the player holds or uses this item. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#playerAnimationsId (protected String, line 323, default 'Default'). Controls player hand position and animation when item is equipped.
 */
export type PlayerAnimationSet = string;
/**
 * Path to the 3D model asset for rendering the item. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#model (protected String, line 325). Model is displayed when item is held or dropped. If not specified, a default generic item model is used.
 */
export type Item3DModel = string;
/**
 * Scale multiplier for the item model. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#scale (protected float, line 326, default 1.0). Value of 1.0 is standard size; higher values enlarge the model, lower values shrink it.
 */
export type ModelScale = number;

export interface MaskVariantMap {
  lighter: true;
  light: true;
  base: true;
  dark: true;
  darker: true;
}

export type MaskVariantKey = keyof MaskVariantMap;

export type MaskVariant = AutoComplete<MaskVariantKey>;

/**
 * Path to the texture asset for the item model. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#texture (protected String, line 327, default 'Items/Unknown.png'). Texture is applied to the 3D model surface for visual appearance.
 */
export type ItemTexture = string;
/**
 * Animation asset for idle animations of the held item. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#animation (protected String, line 328). Animations loop while item is held and visible in first-person or third-person view.
 */
export type ItemAnimation = string;
/**
 * Animation for the item when dropped on the ground. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#droppedItemAnimation (protected String, line 346). Controls animation of floating item entities on the ground.
 */
export type DroppedItemAnimation = string;
/**
 * Whether to use player hand animations for this item. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#usePlayerAnimations (protected boolean, line 324, default false). When true, player hand animations drive the item display instead of item-specific animations.
 */
export type UsePlayerAnimations = boolean;
/**
 * Particle effects displayed while holding the item. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#particles (protected ModelParticle[], line 335). Particles are visible in both first-person and third-person views.
 */
export type ItemParticles = {
  [k: string]: unknown;
}[];
/**
 * Particle effects visible only in first-person view. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#firstPersonParticles (protected ModelParticle[], line 336). Allows unique particle effects only visible to the player holding the item.
 */
export type FirstPersonParticles = {
  [k: string]: unknown;
}[];
/**
 * Trail effects that follow the item model. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#trails (protected ModelTrail[], line 337). Creates visual effects like energy trails or smoke following the item.
 */
export type ModelTrails = {
  [k: string]: unknown;
}[];
/**
 * Red component of light color (0-255). Higher values increase red intensity.
 */
export type RedChannel = number;
/**
 * Green component of light color (0-255). Higher values increase green intensity.
 */
export type GreenChannel = number;
/**
 * Blue component of light color (0-255). Higher values increase blue intensity.
 */
export type BlueChannel = number;
/**
 * Light brightness level (0-15). Higher values create brighter illumination. Value of 15 is maximum brightness.
 */
export type LightBrightness = number;
/**
 * Physics mass of the dropped item. Affects how quickly it falls and moves. Higher values make items fall faster and have more inertia.
 */
export type ItemMass = number;
/**
 * Friction resistance when item slides on surfaces. Higher values increase friction and slow movement. Value 0-1 typical.
 */
export type FrictionCoefficient = number;
/**
 * Whether gravity affects the dropped item. If false, item floats in place.
 */
export type ApplyGravity = boolean;
/**
 * Distance in blocks at which a player can pick up the dropped item. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemEntityConfig#pickupRadius (protected float, line 47, default 1.75f). Larger radius makes item easier to collect.
 */
export type ItemPickupRadius = number;
/**
 * Seconds before dropped item despawns from the world. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemEntityConfig#ttl (protected Float, line 48). Items disappear after this duration if not picked up.
 */
export type ItemLifetime = number;
/**
 * Particle system asset displayed while item exists on ground. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemEntityConfig#particleSystemId (protected String, line 49, default 'Item'). Creates visual effects around dropped items.
 */
export type ParticleSystem = string;
/**
 * Hex color for particles (#RRGGBB format). Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemEntityConfig#particleColor (protected Color, line 50). Colors the particle effects around dropped items.
 */
export type ParticleColor = string;
/**
 * Whether to display particles for dropped items. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemEntityConfig#showItemParticles (protected boolean, line 51, default true). Can be disabled for performance on common items.
 */
export type ShowParticles = boolean;
/**
 * Sound effect played when the item is picked up. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#soundEventId (protected String, line 331). Provides audio feedback for item collection.
 */
export type PickupSoundEvent = string;
/**
 * Sound set asset identifier for various item interactions. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#itemSoundSetId (protected String, line 333, default 'ISS_Default'). Controls sounds for equipping, using, and other item interactions.
 */
export type ItemSoundSet = string;
/**
 * Type of resource this tool specification gathers. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemToolSpec#gatherType (protected String, line 47). Examples: 'Rocks', 'Wood', 'Ore', 'Plants'.
 */
export type GatherType = string;
/**
 * Effectiveness/power of this tool on the gather type. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemToolSpec#power (protected float, line 48). Higher values gather faster and more efficiently.
 */
export type ToolPower = number;
/**
 * Quality level of this tool spec. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemToolSpec#quality (protected int, line 49). Higher quality tools gather better resources.
 */
export type ToolQuality = number;
/**
 * Whether this tool is incorrect for the material. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemToolSpec#incorrect (protected boolean, line 50). Incorrect tools gather slower and may not work at all.
 */
export type IsIncorrectTool = boolean;
/**
 * Sound effect when hitting this block type. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemToolSpec#hitSoundLayerId (protected String, line 52). Additional sound layer played on top of block breaking sound.
 */
export type HitSound = string;
/**
 * Array of ItemToolSpec configurations. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemTool#specs (protected ItemToolSpec[], line 38). Each spec defines how tool performs on a specific gather type.
 */
export type ToolSpecifications = {
  GatherType: GatherType;
  Power: ToolPower;
  Quality?: ToolQuality;
  IsIncorrect?: IsIncorrectTool;
  HitSoundLayer?: HitSound;
}[];
/**
 * Multiplier for tool usage speed. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemTool#speed (protected float, line 39). Value 1.0 is normal speed; higher values are faster, lower slower.
 */
export type ToolSpeedMultiplier = number;
/**
 * List of specific block type IDs that cause durability loss. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemTool.DurabilityLossBlockTypes#blockTypes (protected String[], line 122).
 */
export type DurabilityLossBlockTypes = string[];
/**
 * List of block set identifiers that cause durability loss. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemTool.DurabilityLossBlockTypes#blockSets (protected String[], line 123). Allows grouping multiple blocks.
 */
export type BlockSets = string[];
/**
 * Durability consumed per hit on specified blocks. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemTool.DurabilityLossBlockTypes#durabilityLossOnHit (protected double, line 124).
 */
export type DurabilityLoss = number;
/**
 * Per-material durability loss settings. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemTool#durabilityLossBlockTypes (protected DurabilityLossBlockTypes[], line 40). Allows different materials to degrade tool at different rates.
 */
export type DurabilityLossConfiguration = {
  BlockTypes?: DurabilityLossBlockTypes;
  BlockSets?: BlockSets;
  DurabilityLossOnHit?: DurabilityLoss;
}[];
/**
 * Default sound effect when tool hits blocks (if spec doesn't override). Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemTool#hitSoundLayerId (protected String, line 42). Plays in addition to block breaking sound.
 */
export type GlobalHitSound = string;
/**
 * Sound when tool hits incorrect material. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemTool#incorrectMaterialSoundLayerId (protected String, line 45). Provides audio feedback that tool is wrong for the material.
 */
export type IncorrectMaterialSound = string;
/**
 * Which entity stat to modify (e.g., 'Damage', 'AttackSpeed'). Maps to StaticModifier#type.
 */
export type StatType = string;
/**
 * Amount to modify the stat by. Maps to StaticModifier#value.
 */
export type ModifierValue = number;
/**
 * How to apply the modifier. Maps to com.hypixel.hytale.protocol.CalculationType enum (Modifier#calculationType field).
 */
export type CalculationType = "Additive" | "Multiplicative";
/**
 * Entity stats to remove/clear when weapon is unequipped. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemWeapon#rawEntityStatsToClear (protected String[], line 39). Removes stat modifiers when weapon is no longer held.
 */
export type StatsToClear = string[];
/**
 * Whether this weapon can be equipped in both hands simultaneously. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemWeapon#renderDualWielded (protected boolean, line 42). If true, weapon renders in both hands when equipped.
 */
export type CanDualWield = boolean;
/**
 * Which equipment slot this armor occupies on the player. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemArmor#armorSlot (ItemArmorSlot enum, line 67). Determines where armor is visually equipped.
 */
export type EquipmentSlot = "Head" | "Chest" | "Hands" | "Legs";
/**
 * Base percentage of damage reduction this armor provides. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemArmor#baseDamageResistance (protected double, line 76). Value of 0.2 = 20% damage reduction.
 */
export type BaseDamageResistance = number;
/**
 * Cosmetic items that are hidden when this armor is equipped. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemArmor#cosmeticsToHide (protected Cosmetic[], line 81). Prevents cosmetic clipping through armor.
 */
export type CosmeticsToHide = string[];
/**
 * Maximum fall speed while gliding. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemGlider#terminalVelocity (protected float, line 30). Negative values indicate downward motion. More negative = faster fall.
 */
export type TerminalVelocity = number;
/**
 * Rate at which fall speed is incremented while gliding. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemGlider#fallSpeedMultiplier (protected float, line 31). Controls acceleration downward. Lower values = slower acceleration.
 */
export type FallSpeedMultiplier = number;
/**
 * Rate at which horizontal movement speed is incremented while gliding. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemGlider#horizontalSpeedMultiplier (protected float, line 32). Controls forward acceleration while gliding.
 */
export type HorizontalSpeedMultiplier = number;
/**
 * Base horizontal movement speed while gliding. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemGlider#speed (protected float, line 33). Controls how fast player moves forward while actively gliding.
 */
export type BaseGlidingSpeed = number;
/**
 * Whether this item can be used/activated by the player. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemUtility#usable (protected boolean, line 38). If true, item can be activated via use action.
 */
export type IsUsable = boolean;
/**
 * Whether this item is compatible with other items (for combination/stacking effects). Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemUtility#compatible (protected boolean, line 39). Determines if item can be used with other items.
 */
export type IsCompatible = boolean;
/**
 * Entity stats to remove when utility item is unequipped. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemUtility#rawEntityStatsToClear (protected String[], line 44).
 */
export type StatsToClear1 = string[];
/**
 * Group identifier for organizing blocks. Maps to com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType#group (protected String, line 449). Used for categorization and block sets. Special group '@Tech' prevents automatic physics.
 */
export type BlockGroup = string;
/**
 * Physical material type of the block affecting collision and physics. Maps to com.hypixel.hytale.protocol.BlockMaterial enum (com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType#material field). Controls entity collision detection and physics interactions.
 */
export type BlockMaterial = "Empty" | "Solid";
/**
 * How the block is rendered visually. Maps to com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType#drawType (protected DrawType enum, line 471). Determines if rendered as cube or custom 3D model.
 */
export type RenderingType = "Empty" | "GizmoCube" | "Cube" | "Model" | "CubeWithModel";
/**
 * Opacity/transparency of the block. Maps to com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType#opacity (protected Opacity enum, line 475). Affects rendering and light propagation.
 */
export type TransparencyLevel = "Solid" | "Transparent" | "Translucent";
/**
 * Single texture for all block faces. Use if all 6 faces share the same texture.
 */
export type AllFacesTexture = string;

/**
 * Texture for the top (+Y) and bottom (-Y) face of the block.
 */
export type UpDownTexture = string;

/**
 * Texture for the top (+Y) face of the block.
 */
export type TopFace = string;
/**
 * Texture for the bottom (-Y) face of the block.
 */
export type BottomFace = string;
/**
 * Texture for the north (-Z) face of the block.
 */
export type NorthFace = string;
/**
 * Texture for the south (+Z) face of the block.
 */
export type SouthFace = string;
/**
 * Texture for the east (+X) face of the block.
 */
export type EastFace = string;
/**
 * Texture for the west (-X) face of the block.
 */
export type WestFace = string;
/**
 * Weight for random variant selection. Higher weights are selected more frequently. Used when multiple texture sets are defined.
 */
export type VariantWeight = number;

/**
 * Texture asset for block rendering. Maps to com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType#textures (protected BlockTypeTextures[], line 460). Can specify 'All' for single texture or per-face textures.
 */
export type BlockTexture = {
  Texture?: AllFacesTexture;
  UpDown?: UpDownTexture;
  All?: AllFacesTexture;
  Up?: TopFace;
  Down?: BottomFace;
  North?: NorthFace;
  South?: SouthFace;
  East?: EastFace;
  West?: WestFace;
  Weight?: VariantWeight;
};

/**
 * Texture assets for block rendering. Maps to com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType#textures (protected BlockTypeTextures[], line 460). Can specify 'All' for single texture or per-face textures.
 */
export type BlockTextures = BlockTexture[];
/**
 * Path to custom 3D model asset. Maps to com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType#customModel (protected String, line 465). Used when DrawType is Model or CubeWithModel.
 */
export type Custom3DModel = string;
/**
 * Scale multiplier for the custom model. Maps to com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType#customModelScale (protected float, line 468, default 1.0). Value 1.0 is standard size.
 */
export type ModelScale1 = number;
/**
 * Animation asset for the custom model. Maps to com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType#customModelAnimation (protected String, line 469). Allows animated models (wind, water flow, etc).
 */
export type ModelAnimation = string;
/**
 * Hex color for block particles (#RRGGBB format). Maps to com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType#particleColor (protected Color). Colors particles spawned when interacting with block.
 */
export type ParticleColor1 = string;
/**
 * Particle system asset spawned on entity interaction with block. Maps to com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType#blockParticleSetId (protected String). Particles spawn when stepping, breaking, or using block.
 */
export type ParticleSystem1 = string;
/**
 * Sound set for block placement, breaking, and interaction. Maps to com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType#blockSoundSetId (protected String, default 'EMPTY'). Provides audio feedback for block interactions.
 */
export type SoundSet = string;
/**
 * Decal asset overlay for block breaking animation. Maps to com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType#blockBreakingDecalId (protected String). Displays damage progression on block surface.
 */
export type BreakingDecal = string;
/**
 * Red component (0-255)
 */
export type Red = number;
/**
 * Green component (0-255)
 */
export type Green = number;
/**
 * Blue component (0-255)
 */
export type Blue = number;
/**
 * Light intensity (0-15). 0 is no light, 15 is maximum brightness.
 */
export type Brightness = number;
/**
 * Whether block can be interacted with/used. Maps to BlockFlags#isUsable.
 */
export type IsUsable1 = boolean;
/**
 * Whether multiple blocks can occupy same space. Maps to BlockFlags#isStackable.
 */
export type IsStackable = boolean;
/**
 * Type of resource gathered (e.g., 'Rocks', 'Wood'). Determines which tools can gather it.
 */
export type GatherType1 = string;
/**
 * Item ID that drops when block is broken.
 */
export type DropItem = string;
/**
 * Number of items dropped per break.
 */
export type DropQuantity = number;
/**
 * Unique identifier for this resource type. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemResourceType#id (String, line 189). Used to track resources this item provides.
 */
export type ResourceTypeID = string;
/**
 * Amount of this resource provided by item. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemResourceType#quantity (Integer, line 191). Used in crafting and resource tracking.
 */
export type ResourceQuantity = number;
/**
 * Resources this item provides when harvested or used. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#resourceTypes (protected ItemResourceType[], line 339). Used for progression and resource tracking.
 */
export type ResourceTypes = {
  Id: ResourceTypeID;
  Quantity?: ResourceQuantity;
}[];
/**
 * Maximum durability points before item breaks/disappears. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#maxDurability (protected double, line 347). Item becomes unusable at 0 durability.
 */
export type MaximumDurability = number;
/**
 * Durability consumed per item use/hit. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#durabilityLossOnHit (protected double, line 349). Higher values reduce item lifespan faster.
 */
export type DurabilityLossPerUse = number;
/**
 * Quality rating as furnace fuel (0.0-1.0). Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#fuelQuality (protected double, line 348, default 1.0). Determines burn duration in furnaces.
 */
export type FuelQuality = number;
/**
 * Whether this item is a variant of another item. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#variant (protected boolean, line 313). Variants are hidden from creative menu by default.
 */
export type IsVariantItem = boolean;
/**
 * Whether item is consumed/used up on activation. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#consumable (protected boolean, line 312). Consumable items disappear after use.
 */
export type IsConsumable = boolean;
/**
 * Whether item drops to ground when player dies. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#dropOnDeath (protected field). If false, item is lost on death.
 */
export type DropOnPlayerDeath = boolean;
/**
 * Whether item model can clip through obstacles in first-person. Maps to Item class. If true, item may show through walls when held.
 */
export type ClipsThroughGeometry = boolean;
/**
 * Whether to show preview when deploying/placing this item. Maps to Item class. Shows ghost model of where item would be placed.
 */
export type ShowDeployablePreview = boolean;
/**
 * Whether all interactions are disabled for this item.
 */
export type InteractionsDisabled = boolean;
/**
 * Entity stats shown in HUD when this item is equipped. Maps to Item class. Shows equipment stat bonuses to player in UI.
 */
export type StatsToDisplayInHUD = string[];
/**
 * How far to pull back arms from obstacles (in blocks).
 */
export type PullbackDistance = number;
/**
 * Speed of pullback animation.
 */
export type PullbackSpeed = number;
/**
 * Size of the aiming reticle.
 */
export type ReticleSize = number;
/**
 * Hex color of reticle (#RRGGBB).
 */
export type ReticleColor = string;

/**
 * Localization configuration for item name and description text. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemTranslationProperties class (lines 14-61). Contains translation keys that reference localization files for displaying item names and descriptions in multiple languages.
 */
export interface TranslationProperties {
  Name?: ItemNameTranslationKey;
  Description?: ItemDescriptionTranslationKey;
}

/**
 * Custom visual properties for icon rendering. Maps to com.hypixel.hytale.server.core.asset.type.item.config.AssetIconProperties class. Controls icon offset, scale, and rotation in UI displays.
 */
export interface IconDisplayProperties {
  OffsetX?: IconXOffset;
  OffsetY?: IconYOffset;
  Scale?: IconScale;
  Rotation?: IconRotation;
  Translation?: IconTranslation;
}
/**
 * Visual rendering configuration for the item in inventory, held in hand, and dropped on ground. Maps to various fields in com.hypixel.hytale.server.core.asset.type.item.config.Item for rendering properties.
 */
export interface ItemRenderingConfiguration {
  Model?: Item3DModel;
  Scale?: ModelScale;
  Texture?: ItemTexture;
  Animation?: ItemAnimation;
  DroppedItemAnimation?: DroppedItemAnimation;
  UsePlayerAnimations?: UsePlayerAnimations;
  Particles?: ItemParticles;
  FirstPersonParticles?: FirstPersonParticles;
  Trails?: ModelTrails;
  Light?: ItemLightEmission;
}
/**
 * Light color and intensity emitted by the held or dropped item. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#light (protected ColorLight, line 338). Illuminates the environment around the item.
 */
export type ItemLightEmission =
  | {
      Red?: RedChannel;
      Green?: GreenChannel;
      Blue?: BlueChannel;
      Brightness?: LightBrightness;
    }
  | string;
/**
 * Configuration for item behavior when dropped on the ground as an entity. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemEntityConfig class (lines 16-90). Controls physics, pickup radius, lifetime, and particles for dropped items.
 */
export interface DroppedItemConfiguration {
  Physics?: ItemPhysics;
  PickupRadius?: ItemPickupRadius;
  Lifetime?: ItemLifetime;
  ParticleSystemId?: ParticleSystem;
  ParticleColor?: ParticleColor;
  ShowItemParticles?: ShowParticles;
}
/**
 * Physics simulation properties for dropped items. Maps to com.hypixel.hytale.server.core.modules.physics.component.PhysicsValues in ItemEntityConfig#physicsValues (line 22). Controls mass, friction, and gravity application.
 */
export interface ItemPhysics {
  Mass?: ItemMass;
  Friction?: FrictionCoefficient;
  ApplyGravity?: ApplyGravity;
}
/**
 * Tool-specific configuration for gathering items like pickaxes, axes, and shovels. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemTool class (lines 21-101). Defines how the tool performs on different material types.
 */
export interface ToolConfiguration {
  Specs?: ToolSpecifications;
  Speed?: ToolSpeedMultiplier;
  DurabilityLossBlockTypes?: DurabilityLossConfiguration;
  HitSoundLayer?: GlobalHitSound;
  IncorrectMaterialSoundLayer?: IncorrectMaterialSound;
}
/**
 * Weapon-specific configuration for combat items like swords and spears. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemWeapon class (lines 23-63). Defines stat modifiers and combat behavior.
 */
export interface WeaponConfiguration {
  StatModifiers?: StatModifiers;
  EntityStatsToClear?: StatsToClear;
  RenderDualWielded?: CanDualWield;
}
/**
 * Entity stat modifications when weapon is equipped. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemWeapon#rawStatModifiers (protected Map<String, StaticModifier[]>, line 36). Modifiers apply to wielder's combat statistics.
 */
export interface StatModifiers {
  [k: string]: {
    Type?: StatType;
    Value?: ModifierValue;
    CalculationType?: CalculationType;
    [k: string]: unknown;
  }[];
}
/**
 * Armor-specific configuration for protection items. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemArmor class (lines 39-240). Defines armor slot, damage resistance, and stat modifications.
 */
export interface ArmorConfiguration {
  ArmorSlot?: EquipmentSlot;
  BaseDamageResistance?: BaseDamageResistance;
  DamageResistance?: DamageTypeResistance;
  KnockbackResistances?: KnockbackResistance;
  StatModifiers?: StatModifiers1;
  CosmeticsToHide?: CosmeticsToHide;
}
/**
 * Resistance to specific damage types. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemArmor#damageResistanceValuesRaw (protected Map<String, StaticModifier[]>, line 69). Allows per-damage-type protection.
 */
export interface DamageTypeResistance {
  [k: string]: {
    [k: string]: unknown;
  }[];
}
/**
 * Resistance to knockback from specific damage types. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemArmor#knockbackResistancesRaw (protected Map<String, Float>, line 87). Reduces knockback velocity.
 */
export interface KnockbackResistance {
  [k: string]: number;
}
/**
 * Entity stat modifications when armor is equipped. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemArmor#rawStatModifiers (protected Map<String, StaticModifier[]>, line 78). Modifiers apply to wearer's statistics.
 */
export interface StatModifiers1 {
  [k: string]: {
    [k: string]: unknown;
  }[];
}
/**
 * Glider-specific configuration for flight equipment like paragliders. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemGlider class (lines 11-60). Defines gliding physics and movement.
 */
export interface GliderConfiguration {
  TerminalVelocity?: TerminalVelocity;
  FallSpeedMultiplier?: FallSpeedMultiplier;
  HorizontalSpeedMultiplier?: HorizontalSpeedMultiplier;
  Speed?: BaseGlidingSpeed;
}
/**
 * Utility item configuration for consumables and misc items. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemUtility class (lines 23-75). Defines usability and stat modifications.
 */
export interface UtilityConfiguration {
  Usable?: IsUsable;
  Compatible?: IsCompatible;
  StatModifiers?: StatModifiers2;
  EntityStatsToClear?: StatsToClear1;
}
/**
 * Entity stat modifications when utility item is equipped. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemUtility#rawStatModifiers (protected Map<String, StaticModifier[]>, line 41). Modifiers apply while item is held.
 */
export interface StatModifiers2 {
  [k: string]: {
    [k: string]: unknown;
  }[];
}
/**
 * Configuration for block-type items that can be placed in the world. Maps to com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType class. Defines visual rendering, gathering, and physics properties of the block.
 */
export interface BlockConfiguration {
  Group?: BlockGroup;
  Material?: BlockMaterial;
  DrawType?: RenderingType;
  Opacity?: TransparencyLevel;
  Textures?: BlockTextures;
  CustomModelTexture?: BlockTextures;
  CustomModel?: Custom3DModel;
  CustomModelScale?: ModelScale1;
  CustomModelAnimation?: ModelAnimation;
  ParticleColor?: ParticleColor1;
  BlockParticleSetId?: ParticleSystem1;
  BlockSoundSetId?: SoundSet;
  BlockBreakingDecalId?: BreakingDecal;
  Light?: LightEmission;
  Flags?: BlockFlags;
  Gathering?: GatheringConfiguration;
  RandomRotation?: "YawStep90";
  Effect?: string[];
  Interactions?: unknown;
}
/**
 * Light color and brightness emitted by the block. Maps to com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType#light (protected ColorLight). Illuminates surrounding blocks.
 */
export interface LightEmission {
  Color: string;
  Radius: number;
}
/**
 * Behavior flags for the block. Maps to com.hypixel.hytale.protocol.BlockFlags. Controls usability and stacking behavior.
 */
export interface BlockFlags {
  IsUsable?: IsUsable1;
  IsStackable?: IsStackable;
}
/**
 * How the block is harvested/gathered. Maps to block gathering properties. Defines what drops when broken.
 */
export interface GatheringConfiguration {
  Breaking?: BreakingBehavior;
}

export type Drop = {
  Type: "Single";
  Item: {
    ItemId: string;
  };
};
/**
 * What happens when block is broken/gathered.
 */
export interface BreakingBehavior {
  GatherType?: GatherType1;
  DropList: {
    Container: {
      Type: "Multiple";
      Containers: Drop | Drop[];
    };
  };
}
/**
 * Custom interaction handlers for the item. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#interactions (protected Map<InteractionType, String>, line 342). Defines what happens on primary/secondary use.
 */
export interface InteractionDefinitions {
  [k: string]: string;
}
/**
 * Global interaction settings. Maps to com.hypixel.hytale.server.core.modules.interaction.interaction.config.InteractionConfiguration. Controls interaction behavior globally.
 */
export interface InteractionConfiguration {
  Disabled?: InteractionsDisabled;
}
/**
 * Variables passed to interactions. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#interactionVars (protected Map<String, String>, line 343). Provides data context for interaction scripts.
 */
export interface InteractionVariables {
  [k: string]: string;
}
/**
 * Conditions that determine item appearance based on entity stats. Maps to com.hypixel.hytale.server.core.asset.type.item.config.Item#itemAppearanceConditions (protected Map<String, ItemAppearanceCondition[]>, line 350). Changes item look based on stats.
 */
export interface ConditionalAppearance {
  [k: string]: {
    [k: string]: unknown;
  }[];
}
/**
 * First-person arm pullback when item approaches obstacles. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemPullbackConfig. Adjusts arm position near walls to prevent clipping.
 */
export interface FirstPersonPullback {
  Distance?: PullbackDistance;
  Speed?: PullbackSpeed;
}
/**
 * Custom reticle display when aiming. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemReticleConfig. Configures crosshair/aiming reticle appearance.
 */
export interface AimingReticle {
  Size?: ReticleSize;
  Color?: ReticleColor;
}
/**
 * Block selector tool configuration. Maps to com.hypixel.hytale.server.core.asset.type.item.config.BlockSelectorToolData. Allows players to select blocks in the world.
 */
export interface BlockSelectorTool {
  [k: string]: unknown;
}
/**
 * Builder tool configuration (brushes, placer). Maps to com.hypixel.hytale.server.core.asset.type.buildertool.config.BuilderToolData. Enables building and terraforming tools.
 */
export interface BuilderTool {
  [k: string]: unknown;
}
/**
 * Portal key configuration for fast travel. Maps to com.hypixel.hytale.server.core.asset.type.item.config.PortalKey. Enables teleportation mechanics.
 */
export interface PortalKey {
  [k: string]: unknown;
}
/**
 * Storage container configuration. Maps to com.hypixel.hytale.server.core.asset.type.item.config.ItemStackContainerConfig. Enables items to contain other items.
 */
export interface ContainerConfiguration {
  [k: string]: unknown;
}
