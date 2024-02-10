import './globals.css'

import type { NextFontWithVariable } from 'next/dist/compiled/@next/font'
import localFont from 'next/font/local'

import { Navbar } from '../components/nav'
import { cx } from '../tools/utils'

const News: NextFontWithVariable = localFont({
  src: './assets/fonts/news.woff2',
  style: 'normal',
  variable: '--font-news',
})

const NewsItl: NextFontWithVariable = localFont({
  src: './assets/fonts/news-itl.woff2',
  style: 'italic',
  variable: '--font-news-itl',
})

const GTA: NextFontWithVariable = localFont({
  src: [
    { path: './assets/fonts/gtl.woff2', weight: '300', style: 'normal' },
    { path: './assets/fonts/gtr.woff2', weight: '400', style: 'normal' },
    { path: './assets/fonts/gtb.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-gta',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cx(
        'text-black bg-cream dark:text-white dark:bg-[#171717]',
        News.variable,
        NewsItl.variable,
        GTA.variable
      )}>
      <body className=" justify-center subpixel-antialiased w-full mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
        <main className=" min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  )
}
