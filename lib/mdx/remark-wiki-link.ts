import { visit } from 'unist-util-visit'
import { slugify } from '@/lib/utils/mdxUtils'

type TextNode = { type: 'text'; value: string }
type LinkNode = { type: 'link'; url: string; data: object; children: TextNode[] }

// Matches Obsidian wiki-links: [[target]] and [[target|alias]]
const WIKI_LINK = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g

/**
 * Local replacement for the (unmaintained) @portaljs/remark-wiki-link.
 * Turns Obsidian [[target]] / [[target|alias]] into internal links to
 * /<slugified-target>, reusing the site's own slugify so [[Prototype]] and
 * [[prototype]] both resolve to /prototype. Runs at build/serialize time.
 */
export default function remarkWikiLink() {
  return (tree: unknown) => {
    visit(tree as never, 'text', (node: unknown, index: unknown, parent: unknown) => {
      const text = node as TextNode
      const idx = index as number | undefined
      const par = parent as { children: unknown[] } | undefined
      if (!par || typeof idx !== 'number' || !text.value.includes('[[')) return

      const value = text.value
      const children: Array<TextNode | LinkNode> = []
      let lastIndex = 0
      let match: RegExpExecArray | null
      WIKI_LINK.lastIndex = 0

      while ((match = WIKI_LINK.exec(value)) !== null) {
        const [full, target, alias] = match
        if (match.index > lastIndex) {
          children.push({ type: 'text', value: value.slice(lastIndex, match.index) })
        }
        children.push({
          type: 'link',
          url: `/${slugify(target)}`,
          data: { hProperties: { className: ['wiki-link'] } },
          children: [{ type: 'text', value: (alias ?? target).trim() }],
        })
        lastIndex = match.index + full.length
      }

      if (children.length === 0) return
      if (lastIndex < value.length) {
        children.push({ type: 'text', value: value.slice(lastIndex) })
      }

      par.children.splice(idx, 1, ...(children as unknown[]))
      return idx + children.length
    })
  }
}
