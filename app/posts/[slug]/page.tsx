import Cerealize from 'components/mdxrsc'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getPosts } from 'tools/server/blog'

export const revalidate = 5
export function generateStaticParams() {
  let posts = getPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Post({ params }: { params: { slug: string } }) {
  let post = getPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const tagClass =
    'text-4xl group-hover:transition group-hover:transform group-hover:duration-700 group-hover:ease-in-out  leading-tight font-semibold group-hover:underline group-hover:decoration-dashed group-hover:underline-offset-4 group-hover:decoration-1 '

  return (
    <section>
      <div className={tagClass}>{post.metadata?.title}</div>
      <div className="flex justify-between items-center font- mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {post.metadata.publishedAt}
          </p>
        </Suspense>
        {/*  <Suspense fallback={<p className="h-5" />}>{views}</Suspense> */}
      </div>
      <Cerealize source={post?.content} />
    </section>
  )
}
