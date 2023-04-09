/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#40A3C0",
        secondary: "#C34D43",
        offWhiteBG: "#fefcf7",
      },
    },
  },
  plugins: [],
};
