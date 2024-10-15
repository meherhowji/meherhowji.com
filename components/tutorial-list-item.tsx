import React from 'react'
import TutorialTitle from './tutorial-title'
import styles from '@/styles/component-css/tutorial-list.module.scss'
import { useRouter } from 'next/navigation'

interface Post {
  title: string
  slug: string
  publishedTime: string
  excerpt: string
  readingTime: string
  coverImage?: string
}

interface TutorialListItemProps {
  posts: Post[]
}

const TutorialListItem: React.FC<TutorialListItemProps> = ({ posts }) => {
  const router = useRouter()
  return (
    // FIXME: make the maxHeight better than hard coded
    <div className={`${styles.scroller} ${posts.length > 4 ? styles.showScroller : ''}`} style={{ maxHeight: posts.length > 4 ? '236px' : '208px' }}>
      <div className={`${styles.grid}`}>
        {posts.map((post, index) => (
          <article className={`${styles.post}`} key={post.slug} onClick={() => router.push(post.slug)}>
            <div className={styles.postIndex}>
              <span className={styles.chapterNumber}>{index + 1}</span>
            </div>
            {/* {themeConfig.showTutorialImage && ( */}
            {/* <div className={styles.coverImage}>
              <Image src={post.coverImage} alt={`Cover photo for ${post.title}`} fill />
            </div> */}
            {/* )} */}
            <TutorialTitle title={post.title} excerpt={post.excerpt} date={post.publishedTime} readingTime={post.readingTime} slug={post.slug} />
          </article>
        ))}
      </div>
    </div>
  )
}

export default TutorialListItem
