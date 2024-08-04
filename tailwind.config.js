/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        1200: '1200px',
      },
      backgroundColor: {
        primary: '#f3f4f6',
        secondary: '#f9fafb',
        tertiary: '#f3f4f6',
      }
    },
  },
  plugins: [],
}

