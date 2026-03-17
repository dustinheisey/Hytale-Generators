import { globals, merge, type CommonThingCfg, type HasLang } from "@";
import {
  type HasAssetIcon,
  type HasCategories,
  type HasItemLevel,
  type HasMaxStack,
  type HasItemQuality,
  type HasItemEntity,
  type HasDropOnDeath,
  type HasPickupSound,
  type HasItemSoundSet,
  type HasSet,
  type HasModel,
  type HasScale,
  type HasTexture,
  type HasAnimation,
  type HasUsePlayerAnimations,
  type HasPlayerAnimationsId,
  type HasDroppedItemAnimation,
  type HasParticles,
  type HasFirstPersonParticles,
  type HasTrails,
  type HasLight,
  type HasItemAppearanceConditions,
  type HasGeometryBehavior,
  type HasHud,
  type HasState,
  type HasResourceTypes,
  type HasVariant,
  type HasInteractions,
  type HasDurability,
  type HasTool,
  type HasBlockSelectorTool,
  type HasBuilderTool,
  type HasReticle,
  type HasWeapon,
  type HasArmor,
  type HasGlider,
  type HasUtility,
  type HasPortalKey,
  type HasContainer,
  type HasConsumable,
  type HasFuelQuality,
  type HasBlockType,
  type HasRenderDeployablePreview,
  type StaticModifier
} from "./thing.types";

type HasId = { id: string };

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const defined = <T extends object>(obj: T): Partial<T> =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>;

const parseModifier = (
  str: string
): { target: "Min" | "Max"; calculationType: "Additive" | "Multiplicative"; amount: number } | undefined => {
  const match = str.match(/^([+\-*])(-?\d+\.?\d*)(min)?$/i);
  if (!match) return undefined;
  const [, op, amount, min] = match;
  return {
    target: min ? "Min" : "Max",
    calculationType: op === "*" ? "Multiplicative" : "Additive",
    amount: parseFloat(amount ?? "0")
  };
};

const buildModifiers = (modifiers: StaticModifier[]) =>
  modifiers.flatMap(m => (m.modifier ? [parseModifier(m.modifier)].filter(Boolean) : []));

const buildModifierMap = (map: Record<string, StaticModifier[]>) =>
  Object.fromEntries(Object.entries(map).map(([k, v]) => [k, buildModifiers(v)]));

// ─── Icon ─────────────────────────────────────────────────────────────────────

export const withIcon = ({ id, icon, iconGenerated, iconProperties }: HasId & HasAssetIcon) =>
  iconGenerated !== false
    ? defined({
        icon: `Icons/ItemsGenerated/${icon ?? id}.png`,
        iconProperties:
          iconProperties &&
          defined({
            scale: iconProperties.scale,
            translation: iconProperties.translation,
            rotation: iconProperties.rotation
          })
      })
    : {};

// ─── Categories ───────────────────────────────────────────────────────────────

export const withCategories = ({ categories }: HasCategories) => defined({ categories });

// ─── Translation ──────────────────────────────────────────────────────────────

export const withTranslation = ({ id, description }: HasId & HasLang) => {
  const lang = `${globals().paths.item.langRoot}.${id}`;
  return {
    translationProperties: defined({
      name: `${lang}.name`,
      description: description !== undefined ? `${lang}.description` : undefined
    })
  };
};

// ─── Item Level ───────────────────────────────────────────────────────────────

export const withItemLevel = ({ level }: HasItemLevel) => defined({ itemLevel: level });

// ─── Max Stack ────────────────────────────────────────────────────────────────

export const withMaxStack = ({ stackSize }: HasMaxStack) => defined({ maxStack: stackSize });

// ─── Quality ──────────────────────────────────────────────────────────────────

export const withItemQuality = ({ quality }: HasId & HasItemQuality) => ({ quality: quality ?? "common" });

// ─── Item Entity ──────────────────────────────────────────────────────────────

export const withItemEntity = ({ itemEntity }: HasItemEntity) =>
  defined({
    itemEntity: itemEntity && {
      ...defined({
        pickupRadius: itemEntity.pickupRadius,
        lifetime: itemEntity.lifetime,
        particleSystemId: itemEntity.particleSystemId,
        particleColor: itemEntity.particleColor,
        showItemParticles: itemEntity.showItemParticles
      }),
      ...(itemEntity.physics && {
        physics: defined({
          mass: itemEntity.physics.mass,
          friction: itemEntity.physics.friction,
          applyGravity: itemEntity.physics.applyGravity
        })
      })
    }
  });

// ─── Drop On Death ────────────────────────────────────────────────────────────

export const withDropOnDeath = ({ dropOnDeath }: HasDropOnDeath) => defined({ dropOnDeath });

// ─── Pickup Sound ─────────────────────────────────────────────────────────────

export const withPickupSound = ({ pickupSound }: HasPickupSound) => defined({ soundEventId: pickupSound });

// ─── Item Sound Set ───────────────────────────────────────────────────────────

export const withItemSoundSet = ({ soundSet }: HasItemSoundSet) => defined({ itemSoundSetId: soundSet });

// ─── Set ──────────────────────────────────────────────────────────────────────

export const withSet = ({ set }: HasSet) => defined({ set });

// ─── Rendering ────────────────────────────────────────────────────────────────

export const withModel = ({ model }: HasModel) => defined({ model });

export const withScale = ({ scale }: HasScale) => defined({ scale });

export const withTexture = ({ id, texture }: HasId & HasTexture) => ({ texture: texture ?? `Items/${id}.png` });

export const withAnimation = ({ animation }: HasAnimation) => defined({ animation });

export const withUsePlayerAnimations = ({ usePlayerAnimations }: HasUsePlayerAnimations) =>
  defined({ usePlayerAnimations });

export const withPlayerAnimationsId = ({ playerAnimationsId }: HasPlayerAnimationsId) =>
  defined({ playerAnimationsId });

export const withDroppedItemAnimation = ({ droppedItemAnimation }: HasDroppedItemAnimation) =>
  defined({ droppedItemAnimation });

export const withParticles = ({ particles }: HasParticles) => defined({ particles });

export const withFirstPersonParticles = ({ firstPersonParticles }: HasFirstPersonParticles) =>
  defined({ firstPersonParticles });

export const withTrails = ({ trails }: HasTrails) => defined({ trails });

export const withLight = ({ light }: HasLight) =>
  defined({
    light:
      light &&
      defined({
        red: light.red,
        green: light.green,
        blue: light.blue,
        brightness: light.brightness
      })
  });

export const withItemAppearanceConditions = ({ itemAppearanceConditions }: HasItemAppearanceConditions) =>
  defined({ itemAppearanceConditions });

export const withGeometryBehavior = ({ geometry }: HasGeometryBehavior) =>
  geometry
    ? defined({
        clipsGeometry: geometry.clipsThrough,
        pullbackConfig:
          geometry.pullbackDistance !== undefined || geometry.pullbackSpeed !== undefined
            ? defined({ distance: geometry.pullbackDistance, speed: geometry.pullbackSpeed })
            : undefined
      })
    : {};

export const withHud = ({ hud }: HasHud) => defined({ displayEntityStatsHud: hud });

export const withState = ({ state }: HasState) => (state != null ? { state } : {});

// ─── Rendering (combined) ─────────────────────────────────────────────────────

export const withRendering = (
  cfg: HasId &
    HasModel &
    HasScale &
    HasTexture &
    HasAnimation &
    HasUsePlayerAnimations &
    HasPlayerAnimationsId &
    HasDroppedItemAnimation &
    HasParticles &
    HasFirstPersonParticles &
    HasTrails &
    HasLight &
    HasItemAppearanceConditions &
    HasGeometryBehavior &
    HasHud &
    HasState
) =>
  merge(
    withModel(cfg),
    withScale(cfg),
    withTexture(cfg),
    withAnimation(cfg),
    withUsePlayerAnimations(cfg),
    withDroppedItemAnimation(cfg),
    withParticles(cfg),
    withFirstPersonParticles(cfg),
    withTrails(cfg),
    withLight(cfg),
    withItemAppearanceConditions(cfg),
    withHud(cfg),
    withState(cfg),
    withPlayerAnimationsId(cfg),
    withGeometryBehavior(cfg)
  );

// ─── Resource Types ───────────────────────────────────────────────────────────

export const withResourceTypes = ({ resourceTypes }: HasResourceTypes) =>
  defined({
    resourceTypes: resourceTypes?.length
      ? resourceTypes.map(r => defined({ id: r.id, quantity: r.quantity }))
      : undefined
  });

// ─── Variant ──────────────────────────────────────────────────────────────────

export const withVariant = ({ variant }: HasVariant) => defined({ variant: variant ?? undefined });

// ─── Interactions ─────────────────────────────────────────────────────────────

export const withInteractions = ({ interactions, interactionVars, disabled }: HasInteractions) =>
  defined({
    interactions,
    interactionVars,
    interactionConfig: disabled !== undefined ? { disabled } : undefined
  });

// ─── Durability ───────────────────────────────────────────────────────────────

export const withDurability = ({ maxDurability, durabilityLossOnHit }: HasDurability) =>
  defined({ maxDurability, durabilityLossOnHit });

// ─── Tool ─────────────────────────────────────────────────────────────────────

export const withTool = ({ tool }: HasTool) =>
  defined({
    tool:
      tool &&
      defined({
        specs: tool.specs?.length
          ? tool.specs.map(s =>
              defined({
                gatherType: s.gatherType,
                power: s.power,
                quality: s.quality,
                isIncorrect: s.isIncorrect,
                hitSoundLayer: s.hitSoundLayer
              })
            )
          : undefined,
        speed: tool.speed,
        durabilityLossBlockTypes: tool.durabilityLossBlockTypes?.length
          ? tool.durabilityLossBlockTypes.map(d =>
              defined({
                blockTypes: d.blockTypes?.length ? d.blockTypes : undefined,
                blockSets: d.blockSets?.length ? d.blockSets : undefined,
                durabilityLossOnHit: d.durabilityLossOnHit
              })
            )
          : undefined,
        hitSoundLayer: tool.hitCorrectSound,
        incorrectMaterialSoundLayer: tool.hitIncorrectSound
      })
  });

// ─── Block Selector Tool ──────────────────────────────────────────────────────

export const withBlockSelectorTool = ({ blockSelectorTool }: HasBlockSelectorTool) =>
  defined({
    blockSelectorTool: blockSelectorTool && defined({ durabilityLossOnUse: blockSelectorTool.durabilityLossOnUse })
  });

// ─── Builder Tool ─────────────────────────────────────────────────────────────

export const withBuilderTool = ({ builderTool }: HasBuilderTool) => defined({ builderTool });

// ─── Reticle ──────────────────────────────────────────────────────────────────

export const withReticle = ({ reticle }: HasReticle) =>
  defined({
    reticle: reticle && defined({ size: reticle.size, color: reticle.color })
  });

// ─── Weapon ───────────────────────────────────────────────────────────────────

export const withWeapon = ({ weapon }: HasWeapon) =>
  defined({
    weapon:
      weapon &&
      defined({
        statModifiers: weapon.statModifiers && buildModifierMap(weapon.statModifiers),
        entityStatsToClear: weapon.entityStatsToClear?.length ? weapon.entityStatsToClear : undefined,
        renderDualWielded: weapon.duelWielded
      })
  });

// ─── Armor ────────────────────────────────────────────────────────────────────

export const withArmor = ({ armor }: HasArmor) =>
  defined({
    armor:
      armor &&
      defined({
        armorSlot: armor.slot,
        baseDamageResistance: armor.baseDamageResistance,
        damageResistance: armor.resistance && buildModifierMap(armor.resistance),
        damageClassEnhancement: armor.enhancement && buildModifierMap(armor.enhancement),
        knockbackResistances: armor.knockbackResistances,
        statModifiers: armor.statModifiers && buildModifierMap(armor.statModifiers),
        cosmeticsToHide: armor.hide,
        regenerating: armor.regenerating
      })
  });

// ─── Glider ───────────────────────────────────────────────────────────────────

export const withGlider = ({ glider }: HasGlider) =>
  defined({
    glider: glider && {
      fallSpeedMultiplier: glider.fallSpeed.multiplier,
      terminalVelocity: glider.fallSpeed.max,
      horizontalSpeedMultiplier: glider.speed.multiplier,
      speed: glider.speed.speed
    }
  });

// ─── Utility ──────────────────────────────────────────────────────────────────

export const withUtility = ({ utility }: HasUtility) =>
  defined({
    utility:
      utility &&
      defined({
        usable: utility.usable,
        compatible: utility.compatible,
        statModifiers: utility.statModifiers && buildModifierMap(utility.statModifiers),
        entityStatsToClear: utility.entityStatsToClear?.length ? utility.entityStatsToClear : undefined
      })
  });

// ─── Portal Key ───────────────────────────────────────────────────────────────

export const withPortalKey = ({ portalKey }: HasPortalKey) =>
  defined({
    portalKey: portalKey && defined({ id: portalKey.id, timeLimit: portalKey.timeLimit })
  });

// ─── Container ────────────────────────────────────────────────────────────────

export const withContainer = ({ container }: HasContainer) =>
  defined({
    container:
      container &&
      defined({
        capacity: container.capacity,
        filter: container.filter,
        tag: container.tag
      })
  });

// ─── Consumable ───────────────────────────────────────────────────────────────

export const withConsumable = ({ consumable }: HasConsumable) => defined({ consumable });

// ─── Fuel Quality ─────────────────────────────────────────────────────────────

export const withFuelQuality = ({ fuelQuality }: HasFuelQuality) => defined({ fuelQuality });

// ─── Block Type ───────────────────────────────────────────────────────────────

export const withBlockType = ({ blockType }: HasBlockType) =>
  defined({
    blockType:
      blockType &&
      defined({
        group: blockType.group,
        material: blockType.material,
        drawType: blockType.drawType,
        opacity: blockType.opacity,
        textures: blockType.textures?.length
          ? blockType.textures.map(t =>
              defined({
                all: t.all,
                up: t.up,
                down: t.down,
                north: t.north,
                south: t.south,
                east: t.east,
                west: t.west,
                weight: t.weight
              })
            )
          : undefined,
        customModel: blockType.customModel,
        customModelScale: blockType.customModelScale,
        customModelAnimation: blockType.customModelAnimation,
        particleColor: blockType.particleColor,
        blockParticleSetId: blockType.blockParticleSetId,
        blockSoundSetId: blockType.blockSoundSetId,
        blockBreakingDecalId: blockType.blockBreakingDecalId,
        light:
          blockType.light &&
          defined({
            red: blockType.light.red,
            green: blockType.light.green,
            blue: blockType.light.blue,
            brightness: blockType.light.brightness
          }),
        flags:
          blockType.flags &&
          defined({
            isUsable: blockType.flags.isUsable,
            isStackable: blockType.flags.isStackable
          }),
        gathering: blockType.gathering?.breaking && {
          breaking: defined({
            gatherType: blockType.gathering.breaking.gatherType,
            itemId: blockType.gathering.breaking.itemId,
            quantity: blockType.gathering.breaking.quantity
          })
        }
      })
  });

// ─── Render Deployable Preview ────────────────────────────────────────────────

export const withRenderDeployablePreview = ({ renderPreview }: HasRenderDeployablePreview) =>
  defined({ renderDeployablePreview: renderPreview });

export const withCommonThing = (cfg: CommonThingCfg) =>
  merge(
    withTranslation(cfg),
    withCategories(cfg),
    withSet(cfg),
    withIcon(cfg),
    withRendering(cfg),
    withMaxStack(cfg),
    withItemLevel(cfg),
    withItemQuality(cfg),
    withItemEntity(cfg),
    withResourceTypes(cfg),
    withDropOnDeath(cfg),
    withVariant(cfg),
    withPickupSound(cfg),
    withItemSoundSet(cfg),
    withInteractions(cfg)
  );
