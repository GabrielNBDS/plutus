/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.edge'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      keyframes: {
        life: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        life: 'life 4750ms linear forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
