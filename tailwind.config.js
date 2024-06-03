/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './local/**/*.html'
  ],
  theme: {
    colors: {
      primary: '#be2198',
      secondary: '#e1ab5b',
      tertiary: '#3a5af4',
      dark: '#1b2140',
      light: '#fafafa',
    },
    screens: {
      sm: '520px',
      md: '767px',
      lg: '992px',
      xl: '1199px',
      xxl: '1440px',
    },
    extend: {},
  },
  plugins: [
    //https://github.com/davidhellmann/tailwindcss-fluid-type
    require('tailwindcss-fluid-type')
  ],
}

