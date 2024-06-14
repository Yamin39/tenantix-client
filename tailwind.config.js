/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": "'Open Sans', sans-serif",
      },
      colors: {
        "primary-color": "#6C59F5",
      },
    },
  },
  plugins: [require("daisyui")],
};
