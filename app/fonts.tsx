import type { NextFontWithVariable } from 'next/dist/compiled/@next/font'
import { Newsreader, Roboto_Flex } from 'next/font/google'
import localFont from 'next/font/local'

const RFlex = Roboto_Flex({
  //weight: ['400', '500', '700'],
  variable: '--rflex',
  subsets: ['latin'],
})

const Mono = localFont({
  src: './assets/fonts/sonmono.woff2',
  variable: '--mono',
})

const NewsReader: NextFontWithVariable = Newsreader({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['400', '600'],
  variable: '--newsreader',
})

export { Mono, NewsReader, RFlex }

/* const GT: NextFontWithVariable = localFont({
  src: [
    { path: './assets/fonts/7.woff2', weight: '400', style: 'normal' },
    { path: './assets/fonts/gtwm.woff2', weight: '500', style: 'normal' },
    { path: './assets/fonts/gtwb.woff2', weight: '700', style: 'normal' },
    { path: './assets/fonts/gtwbb.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-gt',
})
 */
