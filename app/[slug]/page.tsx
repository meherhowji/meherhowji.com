{
  /* 
	TODO: start working here,
	it seems the articles list page is working well, not sure how well on mobile device etc.

	Begin on the Post component, start fixing the dependencies for the 4 components, gotoarrow, toc and mdx 
	Also, breakdown the post component and simplify it. 
	Possibly remove the view counter and shit, keep the analytics simple on vercel possibly.
   */
}
import { Metadata } from 'next'
import { getBlogPosts } from '@/db/read-markdown-files'
import { tagOrder } from '@/lib/utils/mdxUtils'
import SlugListPage from './slugList'
import SlugPage from './slug'
import { MDXPost } from '@/db/markdown.d'

type Params = {
  params: Promise<{
    slug: string
  }>
}

export default async function Page(props: Params) {
  const { slug } = await props.params
  const post = await getPosts(slug)
  return Array.isArray(post) ? <SlugListPage posts={post} /> : <SlugPage post={post} />
}

export async function getPosts(slug: string) {
  const posts = await getBlogPosts()
  const isSlugATag = tagOrder.includes(slug)
  const isSlugInTagList = (post: MDXPost) => post.frontmatter.tags.split(',').includes(slug) // render 'tags' page
  const isSlugInFrontmatter = (post: MDXPost) => post.frontmatter.slug === slug // render 'post' page
  return isSlugATag ? posts.filter(isSlugInTagList) : posts.find(isSlugInFrontmatter)
}

// Creates unique static page for each item in the array for static rendering
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
  // an object return like this {params: { slug: 'this-keyword'}} generates a page
  const blogPosts = await getBlogPosts()
  let posts = blogPosts
    .filter(post => !post.frontmatter.draft)
    .map(post => ({
      slug: post.frontmatter.slug,
    }))
  // make tags their own page as well e.g. meherhowji.com/javascript should load all JS posts
  const tagSlugs = tagOrder.map(tag => ({
    slug: tag,
  }))
  // return post slugs + tags, so that tags are their own pages as well
  // e.g. ['how-js-works', 'this-keyword', 'javascript', 'nextjs']
  return [...posts, ...tagSlugs]
}

// Sources:
// https://github.com/vercel/next.js/blob/canary/examples/blog-starter/src/app/posts/%5Bslug%5D/page.tsx

export async function generateMetaData(props: Params): Promise<Metadata> {
  const params = await props.params
  // const post = await getPostBySlug(params.slug)

  if (!post) {
    return notFound()
  }

  const title = `${post.title} | Next.js Blog Example`

  return {
    title,
    openGraph: {
      title,
      images: [],
    },
  }
}
