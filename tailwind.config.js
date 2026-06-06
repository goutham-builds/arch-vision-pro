/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        architecture: {
          'dark': '#1a1a2e',
          'blue': '#0f3460',
          'accent': '#e94560',
          'light': '#eeeeee',
          'gold': '#d4af37',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
