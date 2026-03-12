import type { HasWordList } from "./word-list.types";

export const parseWord = (word: string) => {
  const words = word.split("=");
  return {
    key: words[0],
    name: words[1]
  };
};

export const withWordList = ({ words }: HasWordList) => ({ translationKeys: words.map(word => parseWord(word).key) });
