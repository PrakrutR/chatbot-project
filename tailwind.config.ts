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
        background: {
          DEFAULT: '#1a1a1a',
          light: '#2a2a2a',
        },
        primary: {
          DEFAULT: '#e57373', // A warm, muted red
          hover: '#ef9a9a',
        },
        secondary: {
          DEFAULT: '#81c784', // A soft green
          hover: '#a5d6a7',
        },
        accent: {
          DEFAULT: '#ffb74d', // A warm orange
          hover: '#ffcc80',
        },
        text: {
          primary: '#f5f5f5',
          secondary: '#bdbdbd',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
