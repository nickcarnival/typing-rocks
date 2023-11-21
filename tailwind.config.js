/** @type {import('tailwindcss').Config} */

import { createThemes } from "tw-colors";
// can't use import aliases: https://github.com/tailwindlabs/tailwindcss/issues/11097
import themes from "./src/themes/themes.json";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  // TODO: add lots of themes here :), probably import them from other places
  plugins: [
    createThemes({
      ...themes,
    }),
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans"],
      },
      boxShadow: {
        "custom-shadow": "0px 0px 10px -1px",
      },
    },
  },
};
