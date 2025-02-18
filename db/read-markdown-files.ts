import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'
import matter, { GrayMatterFile } from 'gray-matter'
import { PostFrontmatter, MDXPost } from '@/db/markdown.d'
import { getBacklinks, getHeadings, calculateReadingTime } from '@/lib/utils/mdxUtils'

// Constants
const MARKDOWN_BLOG_POSTS_PATH = 'data/articles'
const ROOT_FOLDER = path.join(process.cwd(), MARKDOWN_BLOG_POSTS_PATH)

// Read all Markdown files
const getMarkdownFiles = (): string[] => fs.readdirSync(ROOT_FOLDER).filter(file => path.extname(file) === '.md')

// Read and parse a single Markdown file
const readMarkdownFile = (filePath: string): { parsed: GrayMatterFile<string>; raw: string } => {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return { parsed: matter(rawContent) as GrayMatterFile<string>, raw: rawContent }
}

// Enrich frontmatter with additional metadata
const enrichFrontmatter = (
  fileName: string,
  parsed: GrayMatterFile<string>,
  allFilesRaw: string[],
): PostFrontmatter => {
  let data = parsed.data as PostFrontmatter
  let content = parsed.content

  return {
    ...data,
    readingTime: calculateReadingTime(content),
    slug: path.basename(fileName, path.extname(fileName)),
    toc: getHeadings(content),
    backlinks: getBacklinks(allFilesRaw, data.slug, data.title), // Pass raw markdown files
  }
}

// Process a single Markdown file and return serialized MDX content
const processMarkdownFile = async (
  fileName: string,
  parsed: GrayMatterFile<string>,
  allFilesRaw: string[],
): Promise<MDXPost | null> => {
  const enrichedFrontmatter = enrichFrontmatter(fileName, parsed, allFilesRaw)
  const enrichedMarkdown = matter.stringify(parsed.content, enrichedFrontmatter)
  const processedMD = (await serialize(enrichedMarkdown, { parseFrontmatter: true })) as MDXRemoteSerializeResult<
    Record<string, unknown>,
    PostFrontmatter
  >
  return enrichedFrontmatter.draft === 'false' ? processedMD : null
}

// Main function to fetch blog posts
export async function getBlogPosts(): Promise<MDXPost[]> {
  const markdownFiles = getMarkdownFiles()

  // Read all files and store both parsed frontmatter and raw markdown
  const allMarkdownData = markdownFiles.map(fileName => {
    const filePath = path.join(ROOT_FOLDER, fileName)
    return { fileName, ...readMarkdownFile(filePath) }
  })

  // Extract raw markdown for all posts
  const allFilesRaw = allMarkdownData.map(({ raw }) => raw)

  // Process each post with access to all raw markdown content
  const posts = await Promise.all(
    allMarkdownData.map(({ fileName, parsed }) => processMarkdownFile(fileName, parsed, allFilesRaw)),
  )

  // Remove null values
  return posts.filter((post): post is MDXPost => post !== null)
}
