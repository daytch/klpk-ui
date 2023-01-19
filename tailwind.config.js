/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/common/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#AF7F3E',
          200: '#D6B16D',
          300: '#726A64',
        },
        dark: {
          100: '#141519',
          200: '#0D0E10',
          300: '#1B1C21',
          400: '#090909',
        },
        primary: '#4F9DFF',
        success: '#00C008',
        danger: '#FF3535',
      },
      fontFamily: {
        sfpro: ['SF Pro', 'sans-serif'],
        gotham: ['Gotham', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
