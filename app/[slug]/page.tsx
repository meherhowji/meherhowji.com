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
import { getBacklinks, getHeadings, finalDraft, tagOrder } from '@/lib/utils/mdxUtils'
import SlugListPage from './slugList'
import SlugPage from './slug'

type Params = {
  params: Promise<{
    slug: string
  }>
}

export default async function Page(props: Params) {
  const { slug } = await props.params
  const post = await getPosts(slug)
  console.log('🚀 ~ Page ~ post:', post)

  if (Array.isArray(post)) {
    return <SlugListPage postDetails={post} />
  } else {
    return <></>
  }

  // return
  // ) : ( <></>
  //   // <SlugPage postDetails={post} backlinks={post.backlinks} toc={post.toc} />
  // )
}

export async function getPosts(slug: string) {
  const posts = await getBlogPosts()

  if (tagOrder.includes(slug)) {
    // Get all posts that have the tag matching the slug
    return posts.filter(post => post.frontmatter.tags.split(',')[0] === slug)
  }

  // Get the post that matches the slug
  const post = posts.find(post => post.frontmatter.slug === slug)
  if (!post) return {}

  // Gather additional data for the matched post
  return {
    post,
    backlinks: getBacklinks(posts, slug),
    toc: getHeadings(post.content),
  }
}

// Creates unique static page for each item in the array for static rendering
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
  // an object return like this {params: { slug: 'this-keyword'}} generates a page
  const blogPosts = await getBlogPosts()
  let posts = blogPosts
    .filter(post => post.frontmatter.draft === 'false')
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
  const post = getPostBySlug(params.slug)

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
