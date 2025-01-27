'use client'

import TutorialListItem from './tutorial-list-item'
import useGroupedPosts from '@/hooks/useGroupedPost'
import useLocalStorage from '@/hooks/useLocalStorage'
import css from '@/styles/component-css/tutorial-list.module.scss'

interface Post {
  title: string
  slug: string
  publishedTime: string
  excerpt: string
  tags: string[]
  readingTime: string
  coverImage?: string
}

interface GroupedPosts extends Map<string, Post[]> {}

interface TutorialListProps {
  postList: Post[]
}

const TutorialList: React.FC<TutorialListProps> = ({ postList }) => {
  const groupedPosts: any = useGroupedPosts(postList)
  const topics = groupedPosts?.keys()
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
