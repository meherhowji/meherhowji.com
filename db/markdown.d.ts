import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type TocHeading = { level: number; text: string; key: string }

export type PostFrontmatter = {
  author: string
  coverCredit?: string
  coverImage?: string
  draft: boolean
  excerpt: string
  modifiedTime: string
  order: number
  publishedTime: string
  readingTime: string
  slug: string
  tags: string
  title: string
  toc: TocHeading[]
  backlinks: { title: string; slug: string }[]
}

// Enriched frontmatter for list/index surfaces — no serialized MDX body.
export type PostMeta = PostFrontmatter

export type MDXPost = MDXRemoteSerializeResult<Record<string, unknown>, PostFrontmatter>
