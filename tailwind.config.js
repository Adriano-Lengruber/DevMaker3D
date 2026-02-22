/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'preto-tecnico': '#0F0F0F',
        'cinza-escuro': '#1A1A1A',
        'cinza-medio': '#333333',
        'cinza-claro': '#A0A0A0',
        'laranja-criativo': '#F57C00',
        'laranja-hover': '#FF9500',
      },
      fontFamily: {
        'jetbrains': ['var(--font-jetbrains)', 'monospace'],
        'inter': ['var(--font-inter)', 'sans-serif'],
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}