/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        bgSoft: "#FAFAFA",
        bgDark: "#0A0A0A",
        ink: "#0A0A0A",
        inkMute: "#4A4A4A",
        inkFaint: "#8A8A8A",
        accent: "#B92D2D",
        accentDark: "#8B1F1F",
        accentHover: "#D63838",
        accentSoft: "#FAF0F0",
        gold: "#C9A961",
        goldDark: "#A88A48",
        border: "#E5E5E5",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
