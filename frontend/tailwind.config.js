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
      },
    },
  },
  plugins: [],
}
