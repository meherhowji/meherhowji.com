import fs from 'fs'
import path from 'path'
import { cache } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'
import matter, { GrayMatterFile } from 'gray-matter'
import { PostFrontmatter, PostMeta, MDXPost } from '@/db/markdown.d'
import { getBacklinks, getHeadings, calculateReadingTime, tagOrder } from '@/lib/utils/mdxUtils'
import { mdxOptions } from '@/db/mdx-options'

// Constants
const MARKDOWN_BLOG_POSTS_PATH = 'data/articles'
const ROOT_FOLDER = path.join(process.cwd(), MARKDOWN_BLOG_POSTS_PATH)

type ParsedPost = { fileName: string; parsed: GrayMatterFile<string>; raw: string }

// Read + parse every Markdown file exactly once per render pass (cache() dedupes
// the repeated calls from the home / list / slug pages and generateStaticParams).
const readAllParsed = cache((): ParsedPost[] => {
  const files = fs.readdirSync(ROOT_FOLDER).filter(file => path.extname(file) === '.md')
  return files.map(fileName => {
    const raw = fs.readFileSync(path.join(ROOT_FOLDER, fileName), 'utf-8')
    return { fileName, parsed: matter(raw) as GrayMatterFile<string>, raw }
  })
})

// Frontmatter stores draft as the string 'true' / 'false'; normalize to a real boolean.
const normalizeDraft = (value: unknown): boolean =>
  typeof value === 'boolean' ? value : String(value).trim().toLowerCase() === 'true'

// Enrich raw frontmatter with derived metadata (reading time, slug, toc, backlinks).
const enrichFrontmatter = (fileName: string, parsed: GrayMatterFile<string>, allFilesRaw: string[]): PostMeta => {
  const data = parsed.data as PostFrontmatter
  return {
    ...data,
    draft: normalizeDraft(data.draft),
    readingTime: calculateReadingTime(parsed.content),
    slug: path.basename(fileName, path.extname(fileName)),
    toc: getHeadings(parsed.content),
    backlinks: getBacklinks(allFilesRaw, data.slug, data.title),
  }
}

// List/index metadata for every published post — no MDX serialization.
export const getPostsMeta = cache((): PostMeta[] => {
  const all = readAllParsed()
  const allFilesRaw = all.map(({ raw }) => raw)
  return all.map(({ fileName, parsed }) => enrichFrontmatter(fileName, parsed, allFilesRaw)).filter(meta => !meta.draft)
})

// Published posts flattened in reading order: grouped by tag (tagOrder), each group
// sorted by `order`. Used for prev/next article navigation.
const getOrderedPosts = cache((): PostMeta[] =>
  tagOrder.flatMap(tag =>
    getPostsMeta()
      .filter(post => post.tags.split(',')[0].trim() === tag)
      .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)),
  ),
)

export const getPrevNext = cache((slug: string): { prev: PostMeta | null; next: PostMeta | null } => {
  const ordered = getOrderedPosts()
  const i = ordered.findIndex(post => post.slug === slug)
  if (i === -1) return { prev: null, next: null }
  return {
    prev: i > 0 ? ordered[i - 1] : null,
    next: i < ordered.length - 1 ? ordered[i + 1] : null,
  }
})

// Raw body + enriched frontmatter for the article page (rendered server-side via
// next-mdx-remote/rsc, so no pre-serialization here).
export const getArticle = cache(
  async (slug: string): Promise<{ frontmatter: PostMeta; content: string } | null> => {
    const all = readAllParsed()
    const target = all.find(({ fileName }) => path.basename(fileName, path.extname(fileName)) === slug)
    if (!target) return null

    const allFilesRaw = all.map(({ raw }) => raw)
    const frontmatter = enrichFrontmatter(target.fileName, target.parsed, allFilesRaw)
    if (frontmatter.draft) return null

    return { frontmatter, content: target.parsed.content }
  },
)

// Serialize a single post's body (only the one being rendered pays this cost).
export const getPostBySlug = cache(async (slug: string): Promise<MDXPost | null> => {
  const all = readAllParsed()
  const target = all.find(({ fileName }) => path.basename(fileName, path.extname(fileName)) === slug)
  if (!target) return null

  const allFilesRaw = all.map(({ raw }) => raw)
  const frontmatter = enrichFrontmatter(target.fileName, target.parsed, allFilesRaw)
  if (frontmatter.draft) return null

  const compiled = (await serialize(target.parsed.content, { mdxOptions })) as MDXRemoteSerializeResult<
    Record<string, unknown>,
    PostFrontmatter
  >
  return { ...compiled, frontmatter }
})

// Full serialized post list (published only). Prefer getPostsMeta() for list surfaces.
export const getBlogPosts = cache(async (): Promise<MDXPost[]> => {
  const all = readAllParsed()
  const posts = await Promise.all(
    all.map(({ fileName }) => getPostBySlug(path.basename(fileName, path.extname(fileName)))),
  )
  return posts.filter((post): post is MDXPost => post !== null)
})
