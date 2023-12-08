/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#263754",
        "bright-yellow": "#fad456",
        "cream-yellow": "#eed988",
        "light-grey": "#cbc7a9",
        "dark-grey": "#878a84",
        "light-blue": "#748c9c",
        "gold": "#ffd700",
        "silver": "#c0c0c0",
        "bronze": "#cd7f32",
      },
    },
  },
  plugins: [],
};
