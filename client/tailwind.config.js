/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
      backgroundColor: ["even"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
