import type { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypeShiki from '@shikijs/rehype'
import remarkWikiLink from '@/lib/mdx/remark-wiki-link'

// Derive the mdxOptions type from serialize's public signature (its SerializeOptions
// type isn't exported through the package's `exports` map).
type MdxOptions = NonNullable<Parameters<typeof serialize>[1]>['mdxOptions']

// Shiki transformer: stash the raw code (for the copy button) and any
// `title="..."` fence meta onto the <pre>, since @shikijs/rehype doesn't
// surface those the way rehype-pretty-code did.
const codeMeta = {
  pre(this: { source: string; options: { meta?: { __raw?: string } } }, node: { properties: Record<string, unknown> }) {
    node.properties['data-raw'] = this.source
    const title = /title="([^"]+)"/.exec(this.options.meta?.__raw ?? '')?.[1]
    if (title) node.properties['data-title'] = title
  },
}

// Build/serialize-time MDX plugin chain (zero client JS). Shared so the same
// chain can back both next-mdx-remote/serialize and the /rsc renderer.
export const mdxOptions: MdxOptions = {
  remarkPlugins: [remarkGfm, remarkWikiLink],
  rehypePlugins: [[rehypeShiki, { theme: 'one-dark-pro', transformers: [codeMeta] }]],
}
