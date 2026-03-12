import { builder, json, lang, withCommon } from "@";
import type { WordListCfg } from "./word-list.types";
import { parseWord, withWordList } from "./word-list.fragments";

export const wordList = builder((cfg: WordListCfg, { paths: { wordList } }) => {
  const { id, words } = cfg;
  words
    .map(word => parseWord(word))
    .forEach(word => {
      lang(`${id}.${word.key ?? ""}`, word.name ?? "", undefined, { langFile: "wordlists" });
    });

  return json(`${wordList.json}/${id}`, [withCommon(cfg), withWordList(cfg)]);
});
