/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.html',
    './src/**/*.svelte',
    
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}

