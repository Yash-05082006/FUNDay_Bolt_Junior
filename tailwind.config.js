/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#38bdf8',
          600: '#0ea5e9',
          700: '#0284c7',
          800: '#0c4a6e',
          900: '#075985',
        },
        yellow: {
          400: '#fde047',
          500: '#fbbf24',
        },
        green: {
          400: '#84cc16',
          500: '#65a30d',
        },
        orange: {
          400: '#fb923c',
          500: '#f97316',
        }
      },
      fontFamily: {
        'comic': ['Comic Neue', 'cursive'],
        'fredoka': ['Fredoka One', 'cursive'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};