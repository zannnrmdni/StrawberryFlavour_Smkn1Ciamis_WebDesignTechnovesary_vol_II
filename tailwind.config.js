/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './artikel/*.html',
    './assets/js/*.js',
    './assets/js/modules/*.js'
  ],
  theme: {
    extend: {
      colors: {
        kertas: '#FFF6E6',
        tinta: '#16262B',
        langit: '#BFE4F5',
        daun: '#86C254',
        humus: '#7B4B2A',
        pasir: '#F3C64F',
        lempung: '#DE7A45',
        batu: '#557187',
        kerak: '#A9423A',
        mantel: '#F26A55'
      },
      fontFamily: {
        display: ['Gabarito', 'Trebuchet MS', 'sans-serif'],
        body: ['Literata', 'Georgia', 'serif']
      },
      maxWidth: {
        prose: '68ch'
      }
    }
  },
  plugins: []
};
