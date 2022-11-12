import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  // // Whitelisting some classes to avoid content purge
  // safelist: [
  //   'whitelisted',
  //   {
  //     pattern: /bg-(red|green|blue)-(100|200|300)/,
  //   },
  // ],
  theme: {
    extend: {
      colors: {
        primary: "#00b4d8",
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'ui-sans-serif', 'sans-serif'],
        bebas: ['Bebas Neue', 'ui-sans-serif', 'sans-serif'],
      },
      fontSize: {
        ty: ['0.8rem', '1.2rem'],
        sm: ['1rem', '1.5rem'],
        base: ['1.25rem', '1.75rem'],
        lg: ['1.563rem', '2.063rem'],
        xl: ['1.953rem', '2.453rem'],
        '2xl': ['2.441rem', '2.941rem'],
        '3xl': ['3.052rem', '3.552rem'],
        '4xl': ['3.815rem', '4.315rem'],
      }
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    // ...
  ],
};
