// import { merge } from "@";
// import {
//   type HasItemId,
//   type HasItemCategories,
//   type HasIcon,
//   type HasIconProperties,
//   type HasItemLevel,
//   type HasMaxStack,
//   type HasItemQuality,
//   type HasItemSet,
//   type HasPlayerAnimationsId,
//   type HasItemRendering,
//   type HasItemEntity,
//   type HasSoundEventId,
//   type HasItemSoundSet,
//   type HasItemTool,
//   type HasItemWeapon,
//   type HasItemArmor,
//   type HasItemGlider,
//   type HasItemUtility,
//   type HasBlockType,
//   type HasResourceTypes,
//   type HasMaxDurability,
//   type HasDurabilityLoss,
//   type HasFuelQuality,
//   type HasVariant,
//   type HasConsumable,
//   type HasDropOnDeath,
//   type HasClipsGeometry,
//   type HasDeployablePreview,
//   type HasInteractions,
//   type HasInteractionConfig,
//   type HasInteractionVars,
//   type HasAppearanceConditions,
//   type HasHUDStats,
//   type HasPullbackConfig,
//   type HasReticle,
//   type HasBlockSelectorTool,
//   type HasBuilderTool,
//   type HasPortalKey,
//   type HasContainer,
//   type AssetIconProperties,
//   type ItemRendering,
//   type ItemPhysics,
//   type ItemEntityConfig,
//   type ItemTool,
//   type ItemToolSpec,
//   type DurabilityLossBlockTypes,
//   type ItemWeapon,
//   type StaticModifier,
//   type ItemArmor,
//   type ItemGlider,
//   type ItemUtility,
//   type BlockType,
//   type BlockTypeTextures,
//   type BlockFlags,
//   type BlockGathering,
//   type ItemResourceType,
//   type ItemPullbackConfig,
//   type ItemReticleConfig,
//   type ColorLight
// } from "./item.types";

// // ─── Translation ──────────────────────────────────────────────────────────────

// /** Derives translation keys from `cfg.id`. */
// export const withTranslation = (cfg: HasItemId) => ({
//   translationProperties: {
//     name: `items.${cfg.id}.name`,
//     description: `items.${cfg.id}.description`
//   }
// });

// // ─── Icon ─────────────────────────────────────────────────────────────────────

// /** Derives icon path from `cfg.id`, e.g. `Icons/ItemsGenerated/Iron_Sword.png`. */
// export const withIcon = (cfg: HasItemId & HasIcon) =>
//   cfg.icon ? { icon: cfg.icon } : { icon: `Icons/ItemsGenerated/${cfg.id}.png` };

// /** Custom icon display properties. Only generates if any property is defined. */
// export const withIconOffsetX = (cfg: HasIconProperties) =>
//   cfg.iconProperties?.offsetX !== undefined
//     ? { iconProperties: { offsetX: cfg.iconProperties.offsetX } satisfies Partial<AssetIconProperties> }
//     : {};

// export const withIconOffsetY = (cfg: HasIconProperties) =>
//   cfg.iconProperties?.offsetY !== undefined
//     ? { iconProperties: { offsetY: cfg.iconProperties.offsetY } satisfies Partial<AssetIconProperties> }
//     : {};

// export const withIconScale = (cfg: HasIconProperties) =>
//   cfg.iconProperties?.scale !== undefined
//     ? { iconProperties: { scale: cfg.iconProperties.scale } satisfies Partial<AssetIconProperties> }
//     : {};

// export const withIconRotation = (cfg: HasIconProperties) =>
//   cfg.iconProperties?.rotation !== undefined
//     ? { iconProperties: { rotation: cfg.iconProperties.rotation } satisfies Partial<AssetIconProperties> }
//     : {};

// // ─── Categories ───────────────────────────────────────────────────────────────

// /** Creative menu categories. Only generates if defined. */
// export const withCategories = (cfg: HasItemCategories) => (cfg.categories ? { categories: cfg.categories } : {});

// // ─── Stack & Quality ──────────────────────────────────────────────────────────

// /** Maximum stack size. Only generates if defined. */
// export const withMaxStack = (cfg: HasMaxStack) => (cfg.maxStack !== undefined ? { maxStack: cfg.maxStack } : {});

// /** Prevents stacking — always sets maxStack to 1. */
// export const notStackable = { maxStack: 1 };

// /** Quality tier. Only generates if defined. */
// export const withQuality = (cfg: HasItemQuality) => (cfg.quality ? { quality: cfg.quality } : {});

// // ─── Set & Level ──────────────────────────────────────────────────────────────

// /** Asset set. Only generates if defined. */
// export const withSet = (cfg: HasItemSet) => (cfg.set ? { set: cfg.set } : {});

// /** Item level. Only generates if defined. */
// export const withItemLevel = (cfg: HasItemLevel) => (cfg.itemLevel !== undefined ? { itemLevel: cfg.itemLevel } : {});

// // ─── Animations ───────────────────────────────────────────────────────────────

// /** Player animation set. Only generates if defined. */
// export const withPlayerAnimations = (cfg: HasPlayerAnimationsId) =>
//   cfg.playerAnimationsId ? { playerAnimationsId: cfg.playerAnimationsId } : {};

// // ─── Rendering ────────────────────────────────────────────────────────────────

// /** Derives model and texture paths from `cfg.id`. */
// export const withModel = (cfg: HasItemId & HasItemRendering) => ({
//   rendering: {
//     model: cfg.rendering?.model ?? `Items/${cfg.id}`,
//     texture: cfg.rendering?.texture ?? `ItemTextures/${cfg.id}.png`
//   } satisfies Partial<ItemRendering>
// });

// /** Model scale. Only generates if defined. */
// export const withModelScale = (cfg: HasItemRendering) =>
//   cfg.rendering?.scale !== undefined
//     ? { rendering: { scale: cfg.rendering.scale } satisfies Partial<ItemRendering> }
//     : {};

// /** Idle held-item animation. Only generates if defined. */
// export const withModelAnimation = (cfg: HasItemRendering) =>
//   cfg.rendering?.animation
//     ? { rendering: { animation: cfg.rendering.animation } satisfies Partial<ItemRendering> }
//     : {};

// /** Dropped item animation. Only generates if defined. */
// export const withDroppedAnimation = (cfg: HasItemRendering) =>
//   cfg.rendering?.droppedItemAnimation
//     ? { rendering: { droppedItemAnimation: cfg.rendering.droppedItemAnimation } satisfies Partial<ItemRendering> }
//     : {};

// /** Uses player hand animations. Only generates if defined. */
// export const withUsePlayerAnimations = (cfg: HasItemRendering) =>
//   cfg.rendering?.usePlayerAnimations
//     ? { rendering: { usePlayerAnimations: true } satisfies Partial<ItemRendering> }
//     : {};

// /** Item particles. Only generates if defined. */
// export const withItemParticles = (cfg: HasItemRendering) =>
//   cfg.rendering?.particles
//     ? { rendering: { particles: cfg.rendering.particles } satisfies Partial<ItemRendering> }
//     : {};

// /** First-person particles. Only generates if defined. */
// export const withFirstPersonParticles = (cfg: HasItemRendering) =>
//   cfg.rendering?.firstPersonParticles
//     ? { rendering: { firstPersonParticles: cfg.rendering.firstPersonParticles } satisfies Partial<ItemRendering> }
//     : {};

// /** Trail effects. Only generates if defined. */
// export const withTrails = (cfg: HasItemRendering) =>
//   cfg.rendering?.trails ? { rendering: { trails: cfg.rendering.trails } satisfies Partial<ItemRendering> } : {};

// /** Item light. Only generates if defined. */
// export const withItemLight = (cfg: HasItemRendering) =>
//   cfg.rendering?.light ? { rendering: { light: cfg.rendering.light } satisfies Partial<ItemRendering> } : {};

// /** Composes all rendering sub-fragments. */
// export const withRendering = (cfg: HasItemId & HasItemRendering) =>
//   merge(
//     withModel(cfg),
//     withModelScale(cfg),
//     withModelAnimation(cfg),
//     withDroppedAnimation(cfg),
//     withUsePlayerAnimations(cfg),
//     withItemParticles(cfg),
//     withFirstPersonParticles(cfg),
//     withTrails(cfg),
//     withItemLight(cfg)
//   );

// // ─── Color Light ─────────────────────────────────────────────────────────────

// /** Red channel (0–255). */
// export const withLightRed = (red: number) => ({ red }) satisfies Partial<ColorLight>;
// /** Green channel (0–255). */
// export const withLightGreen = (green: number) => ({ green }) satisfies Partial<ColorLight>;
// /** Blue channel (0–255). */
// export const withLightBlue = (blue: number) => ({ blue }) satisfies Partial<ColorLight>;
// /** Light brightness (0–15). */
// export const withLightBrightness = (brightness: number) => ({ brightness }) satisfies Partial<ColorLight>;

// // ─── Item Entity ──────────────────────────────────────────────────────────────

// /** Physics mass. Only generates if defined. */
// export const withItemMass = (cfg: HasItemEntity) =>
//   cfg.itemEntity?.physics?.mass !== undefined
//     ? { physics: { mass: cfg.itemEntity.physics.mass } satisfies Partial<ItemPhysics> }
//     : {};

// /** Friction coefficient. Only generates if defined. */
// export const withItemFriction = (cfg: HasItemEntity) =>
//   cfg.itemEntity?.physics?.friction !== undefined
//     ? { physics: { friction: cfg.itemEntity.physics.friction } satisfies Partial<ItemPhysics> }
//     : {};

// /** Gravity setting. Only generates if defined. */
// export const withItemGravity = (cfg: HasItemEntity) =>
//   cfg.itemEntity?.physics?.applyGravity !== undefined
//     ? { physics: { applyGravity: cfg.itemEntity.physics.applyGravity } satisfies Partial<ItemPhysics> }
//     : {};

// /** Composes physics sub-fragments. */
// export const withItemPhysics = (cfg: HasItemEntity) =>
//   merge(withItemMass(cfg), withItemFriction(cfg), withItemGravity(cfg));

// /** Pickup radius. Only generates if defined. */
// export const withPickupRadius = (cfg: HasItemEntity) =>
//   cfg.itemEntity?.pickupRadius !== undefined
//     ? ({ pickupRadius: cfg.itemEntity.pickupRadius } satisfies Partial<ItemEntityConfig>)
//     : {};

// /** Item lifetime. Only generates if defined. */
// export const withItemLifetime = (cfg: HasItemEntity) =>
//   cfg.itemEntity?.lifetime !== undefined
//     ? ({ lifetime: cfg.itemEntity.lifetime } satisfies Partial<ItemEntityConfig>)
//     : {};

// /** Drop particle system. Only generates if defined. */
// export const withDropParticleSystem = (cfg: HasItemEntity) =>
//   cfg.itemEntity?.particleSystemId
//     ? ({ particleSystemId: cfg.itemEntity.particleSystemId } satisfies Partial<ItemEntityConfig>)
//     : {};

// /** Drop particle color. Only generates if defined. */
// export const withDropParticleColor = (cfg: HasItemEntity) =>
//   cfg.itemEntity?.particleColor
//     ? ({ particleColor: cfg.itemEntity.particleColor } satisfies Partial<ItemEntityConfig>)
//     : {};

// /** Show item particles setting. Only generates if defined. */
// export const withShowItemParticles = (cfg: HasItemEntity) =>
//   cfg.itemEntity?.showItemParticles !== undefined
//     ? ({ showItemParticles: cfg.itemEntity.showItemParticles } satisfies Partial<ItemEntityConfig>)
//     : {};

// /** Composes dropped item entity sub-fragments. */
// export const withItemEntity = (cfg: HasItemEntity) =>
//   cfg.itemEntity
//     ? {
//         itemEntity: merge(
//           withItemPhysics(cfg),
//           withPickupRadius(cfg),
//           withItemLifetime(cfg),
//           withDropParticleSystem(cfg),
//           withDropParticleColor(cfg),
//           withShowItemParticles(cfg)
//         )
//       }
//     : {};

// // ─── Sound ────────────────────────────────────────────────────────────────────

// /** Pickup sound. Only generates if defined. */
// export const withPickupSound = (cfg: HasSoundEventId) => (cfg.soundEventId ? { soundEventId: cfg.soundEventId } : {});

// /** Item sound set. Only generates if defined. */
// export const withItemSoundSet = (cfg: HasItemSoundSet) =>
//   cfg.itemSoundSetId ? { itemSoundSetId: cfg.itemSoundSetId } : {};

// // ─── Durability ───────────────────────────────────────────────────────────────

// /** Max durability. Only generates if defined. */
// export const withMaxDurability = (cfg: HasMaxDurability) =>
//   cfg.maxDurability !== undefined ? { maxDurability: cfg.maxDurability } : {};

// /** Durability loss per hit. Only generates if defined. */
// export const withDurabilityLoss = (cfg: HasDurabilityLoss) =>
//   cfg.durabilityLossOnHit !== undefined ? { durabilityLossOnHit: cfg.durabilityLossOnHit } : {};

// // ─── Fuel ─────────────────────────────────────────────────────────────────────

// /** Fuel quality. Only generates if defined. */
// export const withFuel = (cfg: HasFuelQuality) =>
//   cfg.fuelQuality !== undefined ? { fuelQuality: cfg.fuelQuality } : {};

// // ─── Flags ────────────────────────────────────────────────────────────────────

// /** Variant flag. Only generates if true. */
// export const withVariant = (cfg: HasVariant) => (cfg.variant ? { variant: true } : {});

// /** Consumable flag. Only generates if true. */
// export const withConsumable = (cfg: HasConsumable) => (cfg.consumable ? { consumable: true } : {});

// /** Drop on death flag. Only generates if false. */
// export const withDropOnDeath = (cfg: HasDropOnDeath) => (cfg.dropOnDeath === false ? { dropOnDeath: false } : {});

// /** Clips geometry flag. Only generates if true. */
// export const withClipsGeometry = (cfg: HasClipsGeometry) => (cfg.clipsGeometry ? { clipsGeometry: true } : {});

// /** Deployable preview flag. Only generates if true. */
// export const withDeployablePreview = (cfg: HasDeployablePreview) =>
//   cfg.renderDeployablePreview ? { renderDeployablePreview: true } : {};

// // ─── Tool Spec ────────────────────────────────────────────────────────────────

// /** Composes a single tool spec from sub-fragments. */
// export const withToolSpec = (...fragments: Partial<ItemToolSpec>[]) => merge(...fragments) as ItemToolSpec;

// /** Resource type this spec gathers. */
// export const withGatherType = (type: string) => ({ gatherType: type }) satisfies Partial<ItemToolSpec>;
// /** Tool power on this gather type. */
// export const withToolPower = (power: number) => ({ power }) satisfies Partial<ItemToolSpec>;
// /** Quality level of this spec. */
// export const withToolSpecQuality = (quality: number) => ({ quality }) satisfies Partial<ItemToolSpec>;
// /** Marks this tool as incorrect for the material. */
// export const isIncorrectTool = { isIncorrect: true } satisfies Partial<ItemToolSpec>;
// /** Hit sound for this spec. */
// export const withSpecHitSound = (id: string) => ({ hitSoundLayer: id }) satisfies Partial<ItemToolSpec>;

// // ─── Durability Loss Block Types ──────────────────────────────────────────────

// /** Composes a durability loss block types entry. */
// export const withDurabilityLossBlocks = (...fragments: Partial<DurabilityLossBlockTypes>[]) =>
//   merge(...fragments) as DurabilityLossBlockTypes;

// /** Block types that cause durability loss. */
// export const withDurabilityBlockTypes = (types: string[]) =>
//   ({ blockTypes: types }) satisfies Partial<DurabilityLossBlockTypes>;
// /** Block sets that cause durability loss. */
// export const withDurabilityBlockSets = (sets: string[]) =>
//   ({ blockSets: sets }) satisfies Partial<DurabilityLossBlockTypes>;
// /** Durability consumed per hit. */
// export const withDurabilityLossOnHit = (loss: number) =>
//   ({ durabilityLossOnHit: loss }) satisfies Partial<DurabilityLossBlockTypes>;

// // ─── Tool ─────────────────────────────────────────────────────────────────────

// /** Tool configuration. Only generates if `cfg.tool` is defined. */
// export const withTool = (cfg: HasItemTool) => (cfg.tool ? { tool: cfg.tool } : {});

// // ─── Stat Modifiers ───────────────────────────────────────────────────────────

// /** Additive stat modifier. */
// export const additiveMod = (stat: string, value: number): Record<string, StaticModifier[]> => ({
//   [stat]: [{ type: stat, value, calculationType: "Additive" }]
// });

// /** Multiplicative stat modifier. */
// export const multiplicativeMod = (stat: string, value: number): Record<string, StaticModifier[]> => ({
//   [stat]: [{ type: stat, value, calculationType: "Multiplicative" }]
// });

// // ─── Weapon ───────────────────────────────────────────────────────────────────

// /** Weapon configuration. Only generates if `cfg.weapon` is defined. */
// export const withWeapon = (cfg: HasItemWeapon) => (cfg.weapon ? { weapon: cfg.weapon } : {});

// // ─── Armor ────────────────────────────────────────────────────────────────────

// /** Armor configuration. Only generates if `cfg.armor` is defined. */
// export const withArmor = (cfg: HasItemArmor) => (cfg.armor ? { armor: cfg.armor } : {});

// // ─── Glider ───────────────────────────────────────────────────────────────────

// /** Glider configuration. Only generates if `cfg.glider` is defined. */
// export const withGlider = (cfg: HasItemGlider) => (cfg.glider ? { glider: cfg.glider } : {});

// // ─── Utility ─────────────────────────────────────────────────────────────────

// /** Utility configuration. Only generates if `cfg.utility` is defined. */
// export const withUtility = (cfg: HasItemUtility) => (cfg.utility ? { utility: cfg.utility } : {});

// // ─── Block Type ───────────────────────────────────────────────────────────────

// /** Block group. Only generates if defined. */
// export const withBlockGroup = (cfg: HasBlockType) =>
//   cfg.blockType?.group ? ({ group: cfg.blockType.group } satisfies Partial<BlockType>) : {};

// /** Block material. Only generates if defined. */
// export const withBlockMaterial = (cfg: HasBlockType) =>
//   cfg.blockType?.material ? ({ material: cfg.blockType.material } satisfies Partial<BlockType>) : {};

// /** Draw type. Only generates if defined. */
// export const withDrawType = (cfg: HasBlockType) =>
//   cfg.blockType?.drawType ? ({ drawType: cfg.blockType.drawType } satisfies Partial<BlockType>) : {};

// /** Opacity. Only generates if defined. */
// export const withOpacity = (cfg: HasBlockType) =>
//   cfg.blockType?.opacity ? ({ opacity: cfg.blockType.opacity } satisfies Partial<BlockType>) : {};

// /** Block textures. Only generates if defined. */
// export const withBlockTextures = (cfg: HasBlockType) =>
//   cfg.blockType?.textures ? ({ textures: cfg.blockType.textures } satisfies Partial<BlockType>) : {};

// /** Custom block model. Only generates if defined. */
// export const withBlockModel = (cfg: HasBlockType) =>
//   cfg.blockType?.customModel ? ({ customModel: cfg.blockType.customModel } satisfies Partial<BlockType>) : {};

// /** Block model scale. Only generates if defined. */
// export const withBlockModelScale = (cfg: HasBlockType) =>
//   cfg.blockType?.customModelScale !== undefined
//     ? ({ customModelScale: cfg.blockType.customModelScale } satisfies Partial<BlockType>)
//     : {};

// /** Block model animation. Only generates if defined. */
// export const withBlockModelAnimation = (cfg: HasBlockType) =>
//   cfg.blockType?.customModelAnimation
//     ? ({ customModelAnimation: cfg.blockType.customModelAnimation } satisfies Partial<BlockType>)
//     : {};

// /** Block particle color. Only generates if defined. */
// export const withBlockParticleColor = (cfg: HasBlockType) =>
//   cfg.blockType?.particleColor ? ({ particleColor: cfg.blockType.particleColor } satisfies Partial<BlockType>) : {};

// /** Block particle set. Only generates if defined. */
// export const withBlockParticleSet = (cfg: HasBlockType) =>
//   cfg.blockType?.blockParticleSetId
//     ? ({ blockParticleSetId: cfg.blockType.blockParticleSetId } satisfies Partial<BlockType>)
//     : {};

// /** Block sound set. Only generates if defined. */
// export const withBlockSoundSet = (cfg: HasBlockType) =>
//   cfg.blockType?.blockSoundSetId
//     ? ({ blockSoundSetId: cfg.blockType.blockSoundSetId } satisfies Partial<BlockType>)
//     : {};

// /** Breaking decal. Only generates if defined. */
// export const withBreakingDecal = (cfg: HasBlockType) =>
//   cfg.blockType?.blockBreakingDecalId
//     ? ({ blockBreakingDecalId: cfg.blockType.blockBreakingDecalId } satisfies Partial<BlockType>)
//     : {};

// /** Block light. Only generates if defined. */
// export const withBlockLight = (cfg: HasBlockType) =>
//   cfg.blockType?.light ? ({ light: cfg.blockType.light } satisfies Partial<BlockType>) : {};

// /** Block flags. Only generates if defined. */
// export const withBlockFlags = (cfg: HasBlockType) =>
//   cfg.blockType?.flags ? ({ flags: cfg.blockType.flags } satisfies Partial<BlockType>) : {};

// /** Block gathering. Only generates if defined. */
// export const withGathering = (cfg: HasBlockType) =>
//   cfg.blockType?.gathering ? ({ gathering: cfg.blockType.gathering } satisfies Partial<BlockType>) : {};

// /** Composes all block type sub-fragments. Only generates if `cfg.blockType` is defined. */
// export const withBlockType = (cfg: HasBlockType) =>
//   cfg.blockType
//     ? {
//         blockType: merge(
//           withBlockGroup(cfg),
//           withBlockMaterial(cfg),
//           withDrawType(cfg),
//           withOpacity(cfg),
//           withBlockTextures(cfg),
//           withBlockModel(cfg),
//           withBlockModelScale(cfg),
//           withBlockModelAnimation(cfg),
//           withBlockParticleColor(cfg),
//           withBlockParticleSet(cfg),
//           withBlockSoundSet(cfg),
//           withBreakingDecal(cfg),
//           withBlockLight(cfg),
//           withBlockFlags(cfg),
//           withGathering(cfg)
//         )
//       }
//     : {};

// // ─── Resource Types ───────────────────────────────────────────────────────────

// /** Resource types. Only generates if defined. */
// export const withResourceTypes = (cfg: HasResourceTypes) =>
//   cfg.resourceTypes ? { resourceTypes: cfg.resourceTypes } : {};

// // ─── Interactions ─────────────────────────────────────────────────────────────

// /** Interactions. Only generates if defined. */
// export const withInteractions = (cfg: HasInteractions) => (cfg.interactions ? { interactions: cfg.interactions } : {});

// /** Interaction config. Only generates if defined. */
// export const withInteractionConfig = (cfg: HasInteractionConfig) =>
//   cfg.interactionConfig ? { interactionConfig: cfg.interactionConfig } : {};

// /** Interaction vars. Only generates if defined. */
// export const withInteractionVars = (cfg: HasInteractionVars) =>
//   cfg.interactionVars ? { interactionVars: cfg.interactionVars } : {};

// // ─── Appearance Conditions ────────────────────────────────────────────────────

// /** Appearance conditions. Only generates if defined. */
// export const withAppearanceConditions = (cfg: HasAppearanceConditions) =>
//   cfg.itemAppearanceConditions ? { itemAppearanceConditions: cfg.itemAppearanceConditions } : {};

// // ─── HUD ─────────────────────────────────────────────────────────────────────

// /** HUD stats. Only generates if defined. */
// export const withHUDStats = (cfg: HasHUDStats) =>
//   cfg.displayEntityStatsHUD ? { displayEntityStatsHUD: cfg.displayEntityStatsHUD } : {};

// // ─── Misc ─────────────────────────────────────────────────────────────────────

// /** Pullback config. Only generates if defined. */
// export const withPullback = (cfg: HasPullbackConfig) =>
//   cfg.pullbackConfig ? { pullbackConfig: cfg.pullbackConfig } : {};

// /** Reticle config. Only generates if defined. */
// export const withReticle = (cfg: HasReticle) => (cfg.reticle ? { reticle: cfg.reticle } : {});

// /** Block selector tool. Only generates if defined. */
// export const withBlockSelectorTool = (cfg: HasBlockSelectorTool) =>
//   cfg.blockSelectorTool ? { blockSelectorTool: cfg.blockSelectorTool } : {};

// /** Builder tool. Only generates if defined. */
// export const withBuilderTool = (cfg: HasBuilderTool) => (cfg.builderTool ? { builderTool: cfg.builderTool } : {});

// /** Portal key. Only generates if defined. */
// export const withPortalKey = (cfg: HasPortalKey) => (cfg.portalKey ? { portalKey: cfg.portalKey } : {});

// /** Container config. Only generates if defined. */
// export const withContainer = (cfg: HasContainer) => (cfg.container ? { container: cfg.container } : {});
