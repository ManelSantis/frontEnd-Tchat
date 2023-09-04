/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      screens:{
        'sm': '300px'
      },
      colors: {
        'primary': '#6C7099',
        'secondary': '#BABEE5',
        'tertiary': '#3F4259',
      }
    },
  },
  plugins: [],
}

