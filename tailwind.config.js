/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/**/*.css"],
  theme: {
    extend: {
      colors: {
        primary: "#00c3d0",
        secondary: "#0d0842",
        background: "#f3f3f3",
        favorite: "#ff5841",
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
        secondary: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
