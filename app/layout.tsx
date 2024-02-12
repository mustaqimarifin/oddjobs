import './globals.css'

import { Navbar } from '../components/nav'
import { cx } from '../tools/utils'
import { Mono, NewsReader, RFlex } from './fonts'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cx(
        'text-black bg-cream dark:text-white dark:bg-[#171717] subpixel-antialiased',
        RFlex.variable,
        NewsReader.variable,
        Mono.variable
      )}>
      <body className=" justify-center  w-full mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
        <main className=" min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  )
}
