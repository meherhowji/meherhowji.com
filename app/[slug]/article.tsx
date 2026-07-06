import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/app/mdx-components'
import { mdxOptions } from '@/db/mdx-options'
import type { PostMeta } from '@/db/markdown.d'
import css from '@/styles/page-css/article.module.scss'

export default function ArticlePage({ frontmatter, content }: { frontmatter: PostMeta; content: string }) {
  const fm = frontmatter

  return (
    <section className={css.container}>
      <header className={css.postHeader}>
        <h1>{fm.title}</h1>
        <h3 className={css.postDetailSubtitle}>{fm.excerpt}</h3>
        <div className={css.postDetailMeta}>
          <span rel="author" className={css.authorName}>
            {fm.author}
          </span>
          <span className={css.meta}>
            <time className={css.readingTime}>{fm.readingTime}</time>
          </span>
        </div>
      </header>

      {/* TODO checkpoint 6b: sticky table-of-contents island (fm.toc) */}

      <div className={css.postDetailContent}>
        <MDXRemote source={content} components={mdxComponents} options={{ mdxOptions }} />
      </div>

      <div className={css.backlinks}>
        <hr />
        <h3>Backlinks, or posts that mention this article</h3>
        <div>
          {fm.backlinks.length ? (
            fm.backlinks.map(({ title, slug }) => (
              <span key={slug}>
                <Link href={`/${slug}`}>{title}</Link>
              </span>
            ))
          ) : (
            <span>No mentions yet</span>
          )}
        </div>
      </div>
    </section>
  )
}
