/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f5f7fa',
          100: '#e4e9f2',
          200: '#c7d0e0',
          300: '#9aa9c2',
          400: '#6b7fa1',
          500: '#4d6388',
          600: '#3c4f6f',
          700: '#314058',
          800: '#283447',
          900: '#1f2a39',
          950: '#141b27',
        },
        accent: {
          50:  '#fdf8ee',
          100: '#faedd0',
          200: '#f4d99c',
          300: '#edc068',
          400: '#e6a946',
          500: '#d88f2e',
          600: '#bd7124',
          700: '#9a5520',
          800: '#7e4521',
          900: '#683a1f',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
        serif: ['Nanum Myeongjo', 'serif'],
      },
    },
  },
  plugins: [],
};
