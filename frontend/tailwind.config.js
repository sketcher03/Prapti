/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        myShadow1: "4.1px -5px 0 0 rgb(255 255 255)",
        myShadow2: "-4.1px -5px 0 0 rgb(255 255 255)",
      },
    },
  },
  plugins: [],
};
