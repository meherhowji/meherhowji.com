function getBacklinks(allPosts, slug) {
  const backlinkList = allPosts.filter(doc => doc.content.includes('[[' + slug))
  return backlinkList.map(({ title, slug }) => ({ title, slug }))
}

function getHeadings(post) {
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

function finalCopy(post) {
  if (process.env.NODE_ENV === 'development') {
    return post
  } else {
    return post && !JSON.parse(post.draft)
  }
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function finalDraft(post) {
  return process.env.NODE_ENV === 'development' ? true : post && !JSON.parse(post.draft).draft
}
// interface Post {
//   draft: string // Assuming draft is a JSON-encoded string, e.g., '{"draft":true}' or '{"draft":false}'
//   [key: string]: any // Other properties can be dynamic
// }
const tagOrder = ['javascript', 'blog', 'cloud', 'nextjs']

export { getBacklinks, finalCopy, getHeadings, slugify, finalDraft, tagOrder }
