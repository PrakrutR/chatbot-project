// tailwind.config.ts
import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

const config: Config = {
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
        // Add these for password strength indicator
        passwordStrength: {
          weak: colors.red[500],
          fair: colors.orange[500],
          good: colors.yellow[500],
          strong: colors.green[500],
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
