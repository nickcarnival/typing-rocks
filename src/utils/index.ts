import type wordDictionary from "@data/word-dictionary.json";
import themes from "@theme/themes.json";

type LanguageNames = keyof typeof wordDictionary;

type ThemeNames = keyof typeof themes;

type Count = 10 | 25 | 50 | 100 | 200;
type StringCount = "10" | "25" | "50" | "100" | "200";

const allThemes: ThemeNames[] = Object.keys(themes) as ThemeNames[];

export {
  type ThemeNames,
  allThemes,
  type LanguageNames,
  type Count,
  type StringCount,
};
