import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { JSX } from 'react'
import lqip from 'tools/server/lqip'

import { components } from './mdx'

export default function Cerealize(
  props: JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <div
      suppressHydrationWarning
      className="prose prose-neutral dark:prose-invert">
      <MDXRemote
        {...props}
        options={{
          mdxOptions: {
            rehypePlugins: [lqip],
          },
        }}
        components={{ ...components, ...(props.components || {}) }}
      />
    </div>
  )
}
