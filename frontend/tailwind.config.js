/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F5132', // Emerald / Forest Green
          dark: '#0B3C25',
          light: '#166534',
        },
        secondary: {
          DEFAULT: '#D97706', // Deep Warm Orange
          dark: '#EA580C',
          light: '#F59E0B',
        },
        coral: {
          DEFAULT: '#FF6A4D',
          hover: '#E85538',
          light: '#FF856E',
        },
        gold: {
          DEFAULT: '#D8A657',
          light: '#F3C97C',
          dark: '#B88536',
        },
        umber: {
          DEFAULT: '#1a0e09',
          dark: '#0f0805',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
