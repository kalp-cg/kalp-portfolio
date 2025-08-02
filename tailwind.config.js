/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff6464',
          50: '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff6464', // Main primary color
          500: '#ff3a3a',
          600: '#ff1c1c',
          700: '#e60000',
          800: '#bd0000',
          900: '#9a0000',
          950: '#560000',
        },
        yellow: {
          DEFAULT: '#ffb400',
        },
        green: {
          DEFAULT: '#72b626',
        },
        blue: {
          DEFAULT: '#4169e1',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'in': 'animate-in 0.5s ease-out',
      },
      keyframes: {
        'animate-in': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}