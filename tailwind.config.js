/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        neutrals: {
          900: '#01272E',  // Primary dark
          800: '#244348',  // Headings
          700: '#385459',
          600: '#657A7E',  // Body text
          500: '#96A5A8',  // Muted text
          100: '#F8F9F9',  // Background
        },
        tertiary: {
          lake: '#168AA9',
          gold: '#C77700',
          lavender: '#5C58A4',
          plum: '#B24CCD',
        },
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

