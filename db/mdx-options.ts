import type { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypeShiki from '@shikijs/rehype'
import remarkWikiLink from '@/lib/mdx/remark-wiki-link'

// Derive the mdxOptions type from serialize's public signature (its SerializeOptions
// type isn't exported through the package's `exports` map).
type MdxOptions = NonNullable<Parameters<typeof serialize>[1]>['mdxOptions']

// Build/serialize-time MDX plugin chain (zero client JS). Shared so the same
// chain can back both next-mdx-remote/serialize and a future /rsc renderer.
export const mdxOptions: MdxOptions = {
  remarkPlugins: [remarkGfm, remarkWikiLink],
  rehypePlugins: [[rehypeShiki, { theme: 'one-dark-pro' }]],
}
