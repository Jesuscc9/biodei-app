/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        zinc: {
          800: '#1c1c1c',
          600: '#3D3D3D',
          700: '#ffffff07',
          300: '#282828',
        },
        green: {
          500: '#34b27b',
          600: '#298E61',
        },
      },
    },
  },
  plugins: [],
}
