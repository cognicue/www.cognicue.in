/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      fontFamily: {
        'cognicue': ['CogniCue', 'sans-serif']
      },
      colors: {
        'primary': '#04dbec',
        'primary-dark': '#07cad8'
      }
    },
	},
	plugins: [],
}
