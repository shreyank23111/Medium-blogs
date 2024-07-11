/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

        colors: {
          customBlue: '#778da9',
          nav: "#0d1b2a",
          blogs: "#e0e1dd" // Add your custom color
        },
    },
  },
  variants: {},
  plugins: [],
}

