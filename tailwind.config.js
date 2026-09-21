/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          50:  '#fff0f6',
          100: '#ffd6e7',
          200: '#ffadd2',
          300: '#ff85c2',
          400: '#f06292',
          500: '#e91e8c',
          600: '#c2185b',
          700: '#880e4f',
        },
        teal: {
          50:  '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4',
          600: '#00acc1',
          700: '#0097a7',
        },
        cream: {
          50: '#fff8fc',
          100: '#fff0f6',
          200: '#fde8f2',
        },
        ink: {
          900: '#1a1a2e',
          700: '#2d2d44',
          500: '#5a5a7a',
          300: '#9898b8',
          100: '#e8e8f5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #e91e8c 0%, #00bcd4 100%)',
        'gradient-pink': 'linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)',
        'gradient-soft': 'linear-gradient(135deg, #fff0f6 0%, #e0f7fa 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        bounceIn: { '0%': { opacity: '0', transform: 'scale(0.3)' }, '50%': { opacity: '1', transform: 'scale(1.05)' }, '70%': { transform: 'scale(0.9)' }, '100%': { transform: 'scale(1)' } },
      },
      boxShadow: {
        'card': '0 2px 16px -2px rgba(233, 30, 140, 0.08)',
        'card-hover': '0 8px 32px -4px rgba(233, 30, 140, 0.16)',
        'bottom-nav': '0 -4px 24px -2px rgba(26, 26, 46, 0.12)',
      },
      maxWidth: { 'mobile': '430px' },
    },
  },
  plugins: [],
  safelist: [
    { pattern: /bg-(emerald|amber|violet|red|gray|pink|teal|sky)-(50|100|200|500)/ },
    { pattern: /text-(emerald|amber|violet|red|gray|pink|teal|sky)-(500|600|700)/ },
    { pattern: /border-(emerald|amber|violet|red|gray|pink|teal|sky)-(200|300|400)/ },
  ],
}
