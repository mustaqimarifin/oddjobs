/* eslint-disable jsx-a11y/alt-text */
'use client'
import useNativeLazyLoading from '@charlietango/use-native-lazy-loading'
import Image from 'next/image'
import React from 'react'
import { useInView } from 'react-intersection-observer'

const LazyImage = ({ ow, oh, src, ...rest }) => {
  const supportsLazyLoading = useNativeLazyLoading()
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
    skip: supportsLazyLoading !== false,
  })

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        paddingBottom: `${(oh / ow) * 100}%`,
        background: '#2a4b7a',
      }}>
      {inView || supportsLazyLoading ? (
        <Image
          alt={''}
          {...rest}
          src={src}
          width={ow}
          height={oh}
          loading="lazy"
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
      ) : null}
    </div>
  )
}

export default LazyImage
