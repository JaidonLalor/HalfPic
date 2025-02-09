/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      classes: {
        'square-button': 'w-6 h-6 bg-gray-200 flex justify-center items-center cursor-pointer',
      },
    },
  },
  plugins: [],
}