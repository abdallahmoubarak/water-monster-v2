/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#43b9c3",
        secondary: "#C34D43",
        offWhiteBG: "#fefcf7",
      },
    },
  },
  plugins: [],
};
