import NextImage from 'next/image'
import { memo, Suspense } from 'react'

import { Fade } from './fade'

export const GhostImage = memo(function GhostImage(props: any) {
  return (
    <Suspense>
      <Fade>
        <NextImage {...props} />
      </Fade>
    </Suspense>
  )
})
