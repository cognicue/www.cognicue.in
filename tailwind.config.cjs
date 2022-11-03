/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './data/*.json'
  ],
	theme: {
		extend: {
      fontFamily: {
        'cognicue': ['CogniCue', 'sans-serif'],
        'poppins': ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'primary': '#04dbec',
        'primary-dark': '#07cad8'
      }
    },
	},
	plugins: [
    require('@tailwindcss/forms')
  ],
}
