// import useLocalStorage from '@/lib/hooks/useLocalStorage'
import { MDXPost } from '@/db/markdown.d'
import { TutorialListItem } from '@/components'
import css from '@/components/component-css/tutorial-list.module.scss'

function groupPosts({ postList }: { postList: MDXPost[] }) {
  const tagOrder = ['javascript', 'blog', 'cloud', 'nextjs']
  const postData = new Map()

  tagOrder.forEach(tag => {
    postData.set(tag, [])
  })

  postList.forEach(({ frontmatter }) => {
    let fm = frontmatter
    let tag: string = fm.tags.split(',')[0]
    if (tagOrder.includes(tag)) {
      postData.get(tag).push({ ...fm })
    }
  })

  const dataWithValues = Array.from(postData).filter(([key, value]) => value.length)
  const data = new Map(dataWithValues)
  return data
}

const TutorialList: React.FC<{ postList: MDXPost[] }> = postList => {
  const groupedPosts = groupPosts(postList)
  // const topics = groupedPosts?.keys()
  return (
    groupedPosts && (
      <section className={`${css.topicList}`}>
        {/* TODO: add type for tag and posts*/}
        {Array.from(groupedPosts).map(([tag, posts]: any) => (
          <div className={css.topicItem} key={tag}>
            <div className={css.topicTitle}>
              <h3>
                {/* don't make the category a link when it is on the link page itself */}
                {groupedPosts.size === 1 ? tag : <a href={`/${tag}`}>{tag}</a>}
              </h3>
              <h6 className={css.topicSubTitle}>{`${posts.length} ${tag === 'blog' ? 'Articles' : 'Tutorials'}`}</h6>
              {/* TODO: add sorting if needed from old codebase */}
            </div>
            <div className={`${css.topicListContainer} ${css.rowBottomGap}`}>
              <TutorialListItem posts={posts} />
            </div>
          </div>
        ))}
      </section>
    )
  )
}

export default TutorialList
