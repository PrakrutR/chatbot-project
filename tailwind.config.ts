// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#009688',
          light: '#4DB6AC',
          dark: '#00796B',
        },
        secondary: {
          DEFAULT: '#FFF3E0',
          light: '#FFFAF3',
          dark: '#FFE0B2',
        },
        accent: {
          DEFAULT: '#FF5722',
          light: '#FF8A65',
          dark: '#E64A19',
        },
        text: {
          primary: '#212121',
          secondary: '#757575',
        },
        background: {
          DEFAULT: '#FFFFFF',
          alt: '#F5F5F5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
