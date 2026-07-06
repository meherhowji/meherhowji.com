import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticle, getBlogPosts, getPostsMeta } from '@/db/read-markdown-files'
import { tagOrder } from '@/lib/utils/mdxUtils'
import type { MDXPost } from '@/db/markdown.d'
import SlugListPage from './slugList'
import ArticlePage from './article'

type Params = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Params) {
  const { slug } = await params

  // A slug that matches a tag renders a filtered list (e.g. /javascript).
  if (tagOrder.includes(slug)) {
    const posts = (await getBlogPosts()).filter((post: MDXPost) => post.frontmatter.tags.split(',').includes(slug))
    return <SlugListPage posts={posts} />
  }

  const article = await getArticle(slug)
  if (!article) return notFound()
  return <ArticlePage frontmatter={article.frontmatter} content={article.content} />
}

// Static pages for every published post plus one page per tag.
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
  const posts = getPostsMeta().map(post => ({ slug: post.slug }))
  const tags = tagOrder.map(tag => ({ slug: tag }))
  return [...posts, ...tags]
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params

  if (tagOrder.includes(slug)) {
    return { title: `${slug} articles` }
  }

  const article = await getArticle(slug)
  if (!article) return {}

  const { title, excerpt } = article.frontmatter
  return {
    title,
    description: excerpt,
    openGraph: { title, description: excerpt, type: 'article' },
  }
}
