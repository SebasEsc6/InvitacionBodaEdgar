/** @type {import('tailwindcss').Config} */
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
        marfil: {
          DEFAULT: "#F4F0E6",
          50: "#FAF8F3",
          100: "#F4F0E6",
          200: "#E8E0CD",
          300: "#DCD0B4",
        },
        "verde-salvia": {
          DEFAULT: "#777D62",
          light: "#969B85",
          dark: "#5E634C",
        },
        "verde-bosque": {
          DEFAULT: "#263D30",
          light: "#355442",
          dark: "#1B2C23",
          deep: "#132119",
        },
        "yute-natural": {
          DEFAULT: "#C4A77D",
          light: "#D5BE9D",
          dark: "#A8885B",
        },
        "dorado-antiguo": {
          DEFAULT: "#B79A53",
          light: "#D4BC7B",
          dark: "#967A38",
        },
        "madera-nogal": {
          DEFAULT: "#805D40",
          light: "#9C7654",
          dark: "#62442C",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "sans-serif"],
        script: ["var(--font-pinyon)", "cursive"],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(38, 61, 48, 0.08)",
        luxury: "0 20px 40px -15px rgba(38, 61, 48, 0.15)",
        gold: "0 4px 20px -2px rgba(183, 154, 83, 0.25)",
      },
    },
  },
  plugins: [],
};
