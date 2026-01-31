import { syncDir } from "./syncDir.ts";
import { syncFile } from "./syncFile.ts";
import { syncPublic } from "../sync/syncPublic.ts";
import { syncLang } from "../sync/syncLang.ts";
import { syncJson } from "../sync/syncJson.ts";
import { syncTexture } from "../sync/syncTexture.ts";

export function sync(
  config: {
    file: string;
    texture: string;
    color: string;
    outputFile: string;
    lang: { name: string; description?: string };
    name: string;
    description?: string | null;
    data: object;
  },
) {
  const { file, lang, name, description, texture, color, outputFile, data } =
    config;

  syncLang(
    {
      name: { key: lang.name, value: name },
      ...((description && lang.description) &&
        { key: lang.description, value: description }),
    },
  );

  syncJson(
    `dist/Server/Item/Items/Kits/${file}.json`,
    data,
  );

  if (texture) {
    syncTexture(
      {
        inputFile: `assets/${texture}.png`,
        color,
        outputFile: `dist/Common/Resources/${outputFile}.png`,
      },
    );
  }
}

export { syncDir, syncFile, syncJson, syncLang, syncPublic, syncTexture };
