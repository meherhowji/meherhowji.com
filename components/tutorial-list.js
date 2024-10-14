"use client"

import TutorialListItem from './tutorial-list-item'
// import { TiSortAlphabetically } from '@react-icons/all-files/ti/TiSortAlphabetically'
import useGroupedPosts from '@/lib/hooks/useGroupedPost'
import useLocalStorage from '@/lib/hooks/useLocalStorage'
import css from './tutorialList.module.scss'
import { useRouter } from 'next/router'

const TutorialList = ({ postList }) => {
  const router = useRouter()
  const [toggleActiveSort, setToggleActiveSort] = useLocalStorage('sortOrder')
  const groupedPosts = useGroupedPosts(postList, toggleActiveSort)

  return (
    <section className={`${css.postList} container`}>
      {groupedPosts &&
        Array.from(groupedPosts).map(([tag, posts]) => (
          <div className="columns is-gapless" key={tag}>
            <div className="column is-one-fifth">
              <h3 className={css.courseTitle}>
                {/* don't make the category a link when it is on the link page itself */}
                {groupedPosts.size === 1 ? tag : <a href={`/${tag}`}>{tag}</a>}
              </h3>
              <h6 className={css.courseSubTitle}>
                {`${posts.length} ${tag === 'blog' ? 'Articles' : 'Tutorials'}`}
              </h6>
              {tag === 'javascript' && (
                <span
                  className={`${css.icon} ${toggleActiveSort ? css.active : ''}`}
                  onClick={() => setToggleActiveSort(!toggleActiveSort)}
                  title="sort by chapters">
                  {/* <TiSortAlphabetically /> */}
                </span>
              )}
            </div>
            <div className="column hidden">
              <div className={`${css.postListContainer} ${css.rowBottomGap}`}>
                <div className={`${css.scroller} ${posts.length > 4 ? css.showScroller : ''}`}>
                  <div className={`columns is-multiline ${css.interColumnGap}`}>
                    {posts.map((v, i) => TutorialListItem(v, i, router))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </section>
  )
}

export default TutorialList
