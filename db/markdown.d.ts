import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type PostFrontmatter = {
  author: string
  coverCredit?: string
  coverImage?: string
  draft: string
  excerpt: string
  modifiedTime: string
  order: number
  publishedTime: string
  readingTime: string
  slug: string
  tags: string
  title: string
  toc: Object[]
  backlinks: { title: string; slug: string }[]
}

export type MDXPost = MDXRemoteSerializeResult<Record<string, unknown>, PostFrontmatter>
