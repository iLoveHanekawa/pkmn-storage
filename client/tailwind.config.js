/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        vvl: '28rem',
        vl: '16rem',
        'xxs': '0.5rem'
      },
      
      brightness: {
        25: .25
      },
      maxWidth: {
        '1/2': '50%',
        '4/5': '80%'
      },
      width: {
        nvw: "97vw"
      },
      height: {
        nvh: "95vh",
        hvh: "50vh"
      },
      colors: {
        purple: {
          wisteria: '#875F9A',
          bellflower: '#5D3F6A'
        }
      },
      fontFamily: {
        nunito: 'Nunito, sans-serif',
        inter: 'Inter, sans-serif',
        poppins: 'Poppins, sans-serif',
        roboto: 'Roboto, sans-serif',
        pacifico: 'Pacifico, cursive'
      }
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}