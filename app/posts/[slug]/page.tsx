import Cerealize from 'components/mdxrsc'
import { notFound } from 'next/navigation'
import { getPosts } from 'tools/server/blog'
export function generateStaticParams() {
  let posts = getPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function Post({ params }: { params: { slug: string } }) {
  let post = getPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const tagClass =
    'text-xl group-hover:transition group-hover:transform group-hover:duration-700 group-hover:ease-in-out  leading-tight font-serif font-medium group-hover:underline group-hover:decoration-dashed group-hover:underline-offset-4 group-hover:decoration-1 sm:text-2xl'

  return (
    <section>
      <h1 className={tagClass}>{post.metadata?.title}</h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {post.metadata?.publishedAt}
        </p>
      </div>
      <Cerealize source={post?.content} />
    </section>
  )
}
