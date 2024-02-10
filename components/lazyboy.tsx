'use client'
import React from 'react'
import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component'

const Gallery = ({ src, pre, oh, ow, scrollPosition }) => (
  <div className="m-14">
    <div key={src} className="m-14">
      <LazyLoadImage
        alt=""
        height={oh}
        scrollPosition={scrollPosition}
        placeholderSrc={pre}
        /*           className="mx-auto flex transition-all opacity-0 group-hover:blur-sm group-hover:brightness-110 grayscale duration-1000 w-full items-center justify-center object-cover object-top ease-in-out group-hover:opacity-75 lg:max-w-7xl"
          onLoadingComplete={(image) =>
            image.classList.remove(
              'opacity-0',
              'grayscale',
              'blur-sm',
              'brightness-110'
            )
          } */
        //delayTime={1000}
        src={src}
        width={ow}
      />
    </div>
  </div>
)
// Wrap Gallery with trackWindowScroll HOC so it receives
// a scrollPosition prop to pass down to the images
export default trackWindowScroll(Gallery)
