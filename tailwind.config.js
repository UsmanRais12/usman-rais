/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        coal: "#141414",
        line: "#262626",
        lime: "#d4ff3f",
        paper: "#fafafa",
        mute: "#a3a3a3",
      },
      fontFamily: {
        display: ['"Archivo Black"', "Impact", "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      letterSpacing: { tightest: "-0.045em" },
    },
  },
  plugins: [],
};
