/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    'border-red-500',
    'border-orange-500',
    'border-gray-300',
    'shadow-[0_0_20px_rgba(255,59,48,0.3)]',
    'shadow-[0_0_20px_rgba(255,149,0,0.3)]',
    'shadow-[0_10px_30px_rgba(0,0,0,0.1)]',
  ],
  theme: {
    extend: {
      animation: {
        zoomIn: 'zoomIn 0.3s ease forwards',
        blink: 'blink 1s steps(2, start) infinite',
      },
      keyframes: {
        zoomIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      });
    },
  ],
}
