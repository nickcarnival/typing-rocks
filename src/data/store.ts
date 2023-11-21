import { persistentAtom } from "@nanostores/persistent";
import type { ThemeNames, LanguageNames, StringCount } from "@utils";

const count = persistentAtom<StringCount>("count", "25");
const language = persistentAtom<LanguageNames>("language", "english");
const theme = persistentAtom<ThemeNames>("theme", "dark");

export { count, language, theme };
