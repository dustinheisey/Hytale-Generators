import { type HasId, type HasCommon } from "@";

export type HasWordList = { words: string[] };

export type WordListCfg = HasCommon & HasId & HasWordList;
