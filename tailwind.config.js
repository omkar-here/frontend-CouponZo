/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],

  // Set default theme for daisyui as light
  // options: 'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua'
  // Note: theme will change when change mode
  daisyui: {
    themes: [
      "light", // first one will be the default theme
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
    ],
  },

  // Set dark mode as default
  darkMode: "class",
};
