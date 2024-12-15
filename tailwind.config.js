/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    fontFamily: {
      hospregular: ["'Hospital Regular'", 'gobCL_Regular'],
      hospheavy: ["'Hospital Heavy'", 'gobCL_Heavy'],
      hospbold: ["'Hospital Bold'", 'gobCL_Bold'],
      hosplight: ["'Hospital Light'", 'gobCL_Light'],
    },
    extend: {},
  },
  plugins: [],
}

