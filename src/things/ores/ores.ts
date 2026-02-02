import { u } from "@util";
import { syncLang } from "@meta";

/** Update lang files to rename vanilla ores */
export function renameVanillaOres(lang: VanillaLangConfig) {
  for (const [key, value] of Object.entries(lang)) {
    syncLang({
      name: {
        key: `items.Ore_${u(key)}.name`,
        value: `${u(value)} Ore`,
      },
      description: {
        key: `items.Ore_${u(key)}.description`,
        value: `Can be processed into ${u(key)}`,
      },
    });

    ["stone", "basalt", "sandstone", "shale", "slate", "volcanic"].forEach(
      (block) => {
        syncLang({
          name: {
            key: `items.Ore_${u(key)}_${u(block)}.name`,
            value: `${u(value)} Ore - ${u(block)}`,
          },
          description: {
            key: `items.Ore_${u(key)}_${u(block)}.description`,
            value: `Can be processed into ${u(key)}`,
          },
        });
      },
    );
  }
}
