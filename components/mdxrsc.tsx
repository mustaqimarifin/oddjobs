import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { JSX } from 'react'
import smol from 'tools/server/lqip'
import { getPreviewImage } from 'tools/server/preview-images'
import sqip from 'tools/server/sqip'

import { components } from './mdx'

export default function Cerealize(
  props: JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <div className="prose font-mono tracking-tight prose-neutral dark:prose-invert">
      <MDXRemote
        {...props}
        options={{
          mdxOptions: {
            useDynamicImport: true,
            remarkPlugins: [],
            rehypePlugins: [],
            format: 'mdx',
          },
        }}
        components={{ ...components, ...(props.components || {}) }}
      />
    </div>
  )
}
