/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.tsx',
    './src/components/**/*.{html,js,tsx}'
  ],
  theme: {
    extend: {
      visibility: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [],
}

