/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js",
   
  ],
  theme: {
    extend: {
      animation: {
        'pulse-fast': 'pulse 1s linear infinite',
      }
    },
  },
  plugins: [],
}

