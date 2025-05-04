/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {}, 
    container: {
      padding: '2rem',
    },
    screens: {
      'xl' : {'max': '1200px'},
      'lg' : {'max': '991px'},
      'md' : {'max': '768px'},
      'sm' : {'max': '600px'},
      'xsm' : {'max': '360px'},
    }
  },
  plugins: [],
  darkMode: 'class',
}
