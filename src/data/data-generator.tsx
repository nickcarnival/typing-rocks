import wordList from "@data/word-dictionary.json";
import { useStore } from "@nanostores/react";
import { count, language } from "@data/store";

export const useDataGenerator = () => {
  const $count = useStore(count);
  const $language = useStore(language);

  const generateWordList = (x?: string) => {
    const count = x ? +x : +$count;
    const wordLimit = wordList[$language].length;
    const randomWordList = Array.from({ length: count }, () => {
      const randomIndex = Math.floor(Math.random() * wordLimit);
      return {
        name: wordList[$language][randomIndex],
        color: "text-mainText",
      };
    });

    return randomWordList;
  };

  return { generateWordList };
};
