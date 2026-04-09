/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ocean: {
          950: '#012030',
          700: '#13678A',
          400: '#45C4B0',
          200: '#9AEBA3',
          50:  '#DAFDBA',
        },
      },
      keyframes: {
        'slide-up': { '0%': { opacity: 0, transform: 'translateY(16px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'fade-in':  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'scale-in': { '0%': { opacity: 0, transform: 'scale(0.94)' }, '100%': { opacity: 1, transform: 'scale(1)' } },
        'pulse-dot':{ '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } },
        'modal-in': { '0%': { opacity: 0, transform: 'scale(0.92) translateY(20px)' }, '100%': { opacity: 1, transform: 'scale(1) translateY(0)' } },
      },
      animation: {
        'slide-up':  'slide-up 0.35s ease-out both',
        'fade-in':   'fade-in 0.25s ease-out both',
        'scale-in':  'scale-in 0.3s ease-out both',
        'pulse-dot': 'pulse-dot 1.4s ease-in-out infinite',
        'modal-in':  'modal-in 0.35s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
};
