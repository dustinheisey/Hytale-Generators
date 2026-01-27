declare type Config = {
  description?: boolean;
  model?: string;
  texture?: string;
  categories?: string[];
  particleColor?: string;
  lightColor?: string;
  sparksColor?: string;
  benchRequirement?: {
    Type: "Processing" | "Crafting";
    Id: string;
  };
  outputQuantity?: number;
  processingTime?: number;
  itemLevel?: number;
  include?: Filter[];
  exclude?: Filter[];
};

declare type Filter =
  | "ingot"
  | "gem"
  | "ore"
  | "ore_stone"
  | "ore_basalt"
  | "ore_sandstone"
  | "ore_slate"
  | "ore_shale"
  | "ore_volcanic";

declare type BlockType =
  | "stone"
  | "basalt"
  | "sandstone"
  | "slate"
  | "shale"
  | "volcanic";

interface Schema {
  TranslationProperties: {
    Name: string;
    Description?: string;
  };
  Categories: string[];
  PlayerAnimationsId: string;
  IconProperties?: {
    Scale: number;
    Translation: [number, number];
    Rotation: [number, number, number];
  };
  Tags: {
    Type: string[];
    Family?: string[];
  };
  ItemSoundSetId: string;
  DropOnDeath?: boolean;
  MaxStack?: number;
}

interface ItemSchema extends Schema {
  Recipe?: {
    Input: {
      ItemId?: string;
      ResourceTypeId?: string;
      Quantity: number;
    }[];
    BenchRequirement: {
      Type: string;
      Id: string;
    }[];
    OutputQuantity?: number;
    TimeSeconds?: number;
  };
  ItemEntity: {
    ParticleSystemId: null;
  };
  Model: string;
  Texture: string;
  ResourceTypes?: {
    Id: string;
  }[];
  ItemLevel?: number;
}

interface BlockSchema extends Schema {
  BlockType: {
    Material: string;
    DrawType: string;
    Opacity?: string;
    CustomModel: string;
    CustomModelTexture: {
      Texture: string;
      Weight: number;
    }[];
    Group: string;
    Flags: {};
    Gathering: {
      Breaking: {
        GatherType: string;
        DropList?: {
          Container: {
            Type: string;
            Containers: {
              Type: string;
              Item: {
                ItemId: string;
              };
            }[];
          };
        };
      };
    };
    VariantRotation?: string;
    RandomRotation: string;
    BlockParticleSetId: string;
    Textures?: {
      Weight: number;
      All: string;
    }[];
    ParticleColor?: string;
    BlockSoundSetId: string;
    AmbientSoundEventId?: string;
    Light?: {
      Color: string;
      Radius: number;
    };
    Particles?: {
      Color: string;
      SystemId: string;
    }[];
  };
}

interface IngotSchema extends ItemSchema {}

interface GemSchema extends BlockSchema {}

interface OreSchema extends ItemSchema {}

interface OreBlockSchema extends BlockSchema {}
