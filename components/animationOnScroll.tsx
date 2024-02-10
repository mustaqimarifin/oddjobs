'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

export default function AnimationOnScroll({
  children,
}: {
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (target === ref.current) {
            setVisible(isIntersecting)
          }
        })
      },
      {
        threshold: 0.4,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [children])
  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        visible ? 'fade-in blur-0 opacity-100  ' : 'fade-out blur-md  opacity-0'
      }`}>
      {children}
    </div>
  )
}
