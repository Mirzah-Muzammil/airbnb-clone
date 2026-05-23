/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["Fraunces", "serif"],
      },
      colors: {
        ink: "#1f1a17",
        sand: "#f7f4f0",
        clay: "#d8cfc2",
        coral: "#ff5a5f",
      },
    },
  },
  plugins: [],
};
