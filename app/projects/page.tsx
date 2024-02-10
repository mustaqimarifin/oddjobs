import Link from 'next/link'
import { Suspense } from 'react'

import { getProjects } from '../../tools/server/blog'

export const metadata = {
  title: 'Projects',
  description: 'Feel the retardation.',
}

export default function ProjectPage() {
  let posts = getProjects()

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        read my ass
      </h1>
      {posts &&
        posts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1
            }
            return 1
          })
          .map((post) => (
            <Link
              key={post?.slug}
              className="flex flex-col space-y-1 mb-4"
              href={`/projects/${post?.slug}`}>
              <div className="w-full flex flex-col">
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.metadata?.title}
                </p>
                {/*   <Suspense fallback={<p className="h-6" />}>
                <Views slug={post.slug} />
              </Suspense> */}
              </div>
            </Link>
          ))}
    </section>
  )
}

/* async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();

  return <ViewCounter allViews={views} slug={slug} />;
}
 */
