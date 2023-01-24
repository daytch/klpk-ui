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
          400: '#ADA29A',
        },
        dark: {
          100: '#141519',
          200: '#0D0E10',
          300: '#1B1C21',
          400: '#090909',
          500: '#5A5B62',
        },
        primary: '#4F9DFF',
        success: '#00C008',
        danger: '#FF3535',
        kplkWhite: '#F9F7EF',
      },
      fontFamily: {
        sfpro: ['SF Pro', 'sans-serif'],
        gotham: ['Gotham', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
