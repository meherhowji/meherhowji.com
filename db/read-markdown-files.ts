import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'
import matter from 'gray-matter'

export async function getBlogPosts(): Promise<MDXRemoteSerializeResult[]> {
  const MARKDOWN_BLOG_POSTS_PATH = 'data/articles'
  const ROOT_FOLDER = path.join(process.cwd(), MARKDOWN_BLOG_POSTS_PATH)
  const MDXFiles = fs.readdirSync(ROOT_FOLDER).filter(file => path.extname(file) === '.md')

  const posts = await Promise.all(
    MDXFiles.map(async file => {
      const filePath = path.join(ROOT_FOLDER, file)
      const rawContent = fs.readFileSync(filePath, 'utf-8')

      // enrich markdown with computed fields
      const { content, data } = matter(rawContent)
      data.readingTime = calculateReadingTime(content)
      data.slug = path.basename(file, path.extname(file))
      const enrichedMarkdown = matter.stringify(content, data)
      // enrich ends

      const mdxSource = data.draft === 'true' ? await serialize(enrichedMarkdown, { parseFrontmatter: true }) : null
      return mdxSource
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
