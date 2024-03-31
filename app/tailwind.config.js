/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      screens: {
        small: '600px',
        medium: '900px',
        large: '1200px'
      },
      fontFamily: {
        inter: 'var(--inter)'
      },
      colors: {
        background: '#000000',
        primary: {
          DEFAULT: '#0b6e4f',
          light: '#E2D19E',
          dark: '#7F7243',
          hover: '#908154'
        },
        second: {
          DEFAULT: '#9370db',
          light: '#a56eff',
          dark: '#693d89',
          hover: '#693dff'
        },
        hint: {
          DEFAULT: '#d1c4e9'
        }
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
