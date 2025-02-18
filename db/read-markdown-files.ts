import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'
import matter, { GrayMatterFile } from 'gray-matter'
import { PostFrontmatter, MDXPost } from '@/db/markdown.d'

export async function getBlogPosts(): Promise<MDXPost[]> {
  const MARKDOWN_BLOG_POSTS_PATH = 'data/articles'
  const ROOT_FOLDER = path.join(process.cwd(), MARKDOWN_BLOG_POSTS_PATH)
  const MDXFiles = fs.readdirSync(ROOT_FOLDER).filter(file => path.extname(file) === '.md')

  const posts = await Promise.all(
    MDXFiles.map(async file => {
      const filePath = path.join(ROOT_FOLDER, file)
      const rawContent = fs.readFileSync(filePath, 'utf-8')

      // enrich markdown with computed fields
      const parsed = matter(rawContent) as GrayMatterFile<string>
      // update frontmatter
      let data = parsed.data as PostFrontmatter
      let content = parsed.content
      data.readingTime = calculateReadingTime(content)
      data.slug = path.basename(file, path.extname(file))
      // recompose markdown
      const enrichedMarkdown = matter.stringify(content, data)
      // enrich ends

      if (data.draft === 'false') {
        return (await serialize(enrichedMarkdown, { parseFrontmatter: true }).then(
          mdxSource => mdxSource,
        )) as MDXRemoteSerializeResult<Record<string, unknown>, PostFrontmatter>
      }
      return null
    }),
  )
  const nonNullable = <T>(value: T | null): value is T => value !== null
  const postList = posts.filter(nonNullable)
  return postList
}

function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).filter(Boolean).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  const suffix = readingTime > 1 ? 'mins' : 'min'
  return `${readingTime} ${suffix}`
}
