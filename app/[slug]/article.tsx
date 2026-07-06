import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/app/mdx-components'
import { mdxOptions } from '@/db/mdx-options'
import { getPrevNext } from '@/db/read-markdown-files'
import TableOfContent from '@/components/table-of-content'
import GoToTutorialArrow from '@/components/go-to-tutorial-arrow'
import type { PostMeta } from '@/db/markdown.d'
import css from '@/styles/page-css/article.module.scss'

export default function ArticlePage({ frontmatter, content }: { frontmatter: PostMeta; content: string }) {
  const fm = frontmatter
  const { prev, next } = getPrevNext(fm.slug)

  return (
    <section className={css.container}>
      <GoToTutorialArrow target={prev} direction="prev" />
      <GoToTutorialArrow target={next} direction="next" />

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

      <TableOfContent list={fm.toc} />

      <div id="article-content" className={css.postDetailContent}>
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
