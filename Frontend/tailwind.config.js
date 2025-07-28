/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        sm: '680px',
        md: '400px',
        lg: '976px',
        xl: '1440px',
        md2 : '790px',
        md3:"780px",
        md4:"450px"
      },
    },
  },
  plugins: [],
}

