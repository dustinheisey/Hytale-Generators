import { syncJson } from "./util/sync/sync.ts";

syncJson("manifest", {
  Group: "gg.inconvenient",
  Name: "Unified Materials",
  Version: "0.2.0",
  Description: "A description of what this plugin does",
  Authors: [
    {
      Name: "Inconvenient Dev",
      Url: "https://inconvenient.gg",
    },
  ],
  Website: "https://www.curseforge.com/hytale/mods/unified-materials",
  Dependencies: {},
  OptionalDependencies: {},
  LoadBefore: {},
  DisabledByDefault: false,
  IncludesAssetPack: false,
  SubPlugins: [],
});
