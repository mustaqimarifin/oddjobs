import CoverImage from 'components/coverimage'
import { Fade } from 'components/fade'
import imgs from 'components/img.json'
import Link from 'next/link'
export default async function Home() {
  return (
    <section className="container flex max-w-[64rem] flex-col  space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="items-center gap-4 text-center">
        <Link
          href="#"
          className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          target="_blank">
          Follow along
        </Link>
        <div className="bg-gradient-to-br from-foreground from-30% to-foreground/40 bg-clip-text bg-zinc-100  text-center font-heading text-3xl font-semibold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          <span>MEOW~~</span>
          <br />
          <span>Made Simple</span>
        </div>
        <div className="w-full aspect-[21/9] object-fill">
          <div className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Heard your mom's a big fan of open source?
          </div>
          {imgs.map((img) => (
            <Fade key={img.src}>
              <CoverImage src={img.src} />
            </Fade>
          ))}
        </div>

        {/*  <Image
          src="/rr1.jpg"
          width={1920}
          height={1080}
          alt="RR"
          //blurDataURL={dataURI}
        /> */}
      </div>
    </section>
  )
}
