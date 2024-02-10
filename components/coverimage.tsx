'use client'
import Image from 'next/image'

export default function CoverImage({ src }: { src: string }) {
  return (
    <div className="mb-6 max-w-3xl content-center justify-center overflow-hidden md:rounded-lg">
      <Image
        src={src}
        alt={''}
        width={896}
        height={597}
        /* className="mx-auto flex transition-opacity opacity-0 group-hover:blur-sm group-hover:brightness-110 grayscale duration-1000 w-full items-center justify-center object-cover object-top ease-in-out group-hover:opacity-75 lg:max-w-7xl" */
        /*  onLoadingComplete={(image) =>
          image.classList.remove(
            'opacity-0',
            'grayscale',
            'blur-sm',
            'brightness-110'
          )
        } */
      />
      {/*       <figcaption className="text-center ">
        {caption && (
          <span className="text-sm italic text-gray-600 dark:text-gray-400">
            {caption}
          </span>
        )}
      </figcaption> */}
    </div>
  )
}
