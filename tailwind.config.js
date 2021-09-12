const colors = require('tailwindcss/colors')

// tailwind.config.js
module.exports = {
  important: true,
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#0F2B46',
      secondary: '#006494',
      third: '#265180',
      fourth: "#006494",
      five:"rgb(15, 43, 70)",
      sixth: "#1A73E8",
      seventh:"rgba(26, 115, 232, 0.1)",
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
      amber: colors.amber,
      white: colors.white,
    },
    fontSize: {
      'tiny': '.680rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '7xl': '5rem',
    },
    extend: {
      fontFamily: {
        body: ["Roboto"],
      },
    },
  },
  variants: {
    extend: {
      textColor: ['responsive', 'hover', 'focus', 'group-hover'],
      padding: ['hover'],
      borderColor: ['active',"hover"],
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}