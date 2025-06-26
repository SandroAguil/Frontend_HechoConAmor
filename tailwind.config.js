/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pastelPink: '#FBCFE8',
        pastelBlue: '#BAE6FD',
        pastelLavender: '#DDD6FE',
        pastelMint: '#BBF7D0',
        pastelCream: '#FFF7ED',
        brandPrimary: '#d63384',
      },
    },
  },
  plugins: [],
}
