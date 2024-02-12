import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  content: [
    './app/**/*.{ts,tsx, mdx}',
    './components/**/*.{ts,tsx}',
    './public/**/*.svg',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--rflex)'],
        serif: ['var(--newsreader)'],
        itl: ['var(--newsreader)'],
        mono: ['var(--mono)'],
      },
      colors: {
        cream: '#F2F1EC ',
      },
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [animate, typography],
} satisfies Config
