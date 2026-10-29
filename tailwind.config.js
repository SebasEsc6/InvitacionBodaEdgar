/** @type {import('tailwindcss').Config} */
// NOTA: Tailwind v4 toma los tokens desde `@theme` en app/globals.css.
// Este archivo se mantiene sincronizado como referencia / compatibilidad de tooling.
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Paleta de referencia "Golden Hour Garden" ---
        peach: { DEFAULT: "#F2B39A", light: "#F8D3C3", dark: "#E3957A" },
        "golden-hour": { DEFAULT: "#EBB23F", light: "#F3CB76", dark: "#CC942A" },
        copper: { DEFAULT: "#C65A32", light: "#D67953", dark: "#9C4426" },
        apricot: { DEFAULT: "#F29C5E", light: "#F6BA8C", dark: "#DB7F3F" },
        "misty-blue": { DEFAULT: "#9FB6D3", light: "#C2D2E6", dark: "#7894B8" },
        moss: { DEFAULT: "#8E8C47", light: "#AAA867", dark: "#6E6C33" },

        // --- Tokens semánticos re-mapeados a la nueva paleta ---
        marfil: {
          DEFAULT: "#FBF3E8",
          50: "#FEF9F2",
          100: "#FBF3E8",
          200: "#F5E4D2",
          300: "#EDD2B8",
        },
        "verde-salvia": { DEFAULT: "#8E8C47", light: "#AAA867", dark: "#6E6C33" },
        "verde-bosque": {
          DEFAULT: "#4A5229",
          light: "#586131",
          dark: "#30351A",
          deep: "#424925",
        },
        "yute-natural": { DEFAULT: "#F29C5E", light: "#F6BA8C", dark: "#DB7F3F" },
        "dorado-antiguo": { DEFAULT: "#EBB23F", light: "#F3CB76", dark: "#B9862A" },
        "madera-nogal": { DEFAULT: "#A94F2C", light: "#C65A32", dark: "#8A3E22" },
      },
      fontFamily: {
        serif: ["var(--font-bodoni)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "sans-serif"],
        script: ["var(--font-great-vibes)", "cursive"],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(29, 33, 18, 0.10)",
        luxury: "0 20px 40px -15px rgba(29, 33, 18, 0.22)",
        gold: "0 4px 20px -2px rgba(235, 178, 63, 0.28)",
      },
    },
  },
  plugins: [],
};
