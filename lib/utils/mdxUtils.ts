function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).filter(Boolean).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  const suffix = readingTime > 1 ? 'mins' : 'min'
  return `${readingTime} ${suffix}`
}

function getBacklinks(contentList: string[], slug: string, title: string): { title: string; slug: string }[] {
  return contentList
    .map(content => {
      const backlinkMatch = content.match(new RegExp(`\\[\\[${slug}\\]\\]`, 'g')) // Check if slug appears as [[slug]]
      return backlinkMatch ? { title, slug } : null
    })
    .filter((backlink): backlink is { title: string; slug: string } => backlink !== null) // Remove nulls
}

function getHeadings(post: string) {
  const lines = post.split('\n')
  const headings = []
  let insideCodeBlock = false

  for (const line of lines) {
    if (line.startsWith('```')) {
      insideCodeBlock = !insideCodeBlock
    } else if (!insideCodeBlock) {
      const match = line.match(/^(#+)\s+(.*)$/)
      if (match) {
        const [_, level, text] = match
        headings.push({
          level: level.length,
          // added the replace so that \_\_proto_\_\ is rendered properly as __proto__
          text: text.trim().replace(/\\/g, ''),
          key: slugify(text),
        })
      }
    }
  }
  return headings
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

const tagOrder = ['javascript', 'blog', 'cloud', 'nextjs']

export { getBacklinks, getHeadings, slugify, tagOrder, calculateReadingTime }
