import themes from "./themes.json";

type ThemeNames = keyof typeof themes;

const allThemes: ThemeNames[] = Object.keys(themes) as ThemeNames[];

export { type ThemeNames, allThemes };
