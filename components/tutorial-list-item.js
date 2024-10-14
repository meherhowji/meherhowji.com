import React from 'react'
import Image from 'next/image'
import TutorialTitle from './tutorial-title'
import styles from "@/styles/component-css/tutorial-list.module.scss";

const TutorialListItem = (post, index, router) => {
  return (
    <React.Fragment key={post.slug}>
      <div className="column is-1">
        <span className={styles.chapterNumber}>{index + 1}</span>
      </div>
      <div
        className={`column is-5 ${post.className || ''} ${styles.columnGap} ${styles.tutorialListItem}`}
        key={post.slug}>
        <article className="layout-type mb-10" onClick={() => router.push(post.slug)}>
          {themeConfig.showTutorialImage && (
            <div className={styles.coverImage}>
              <Image src={post.coverImage} alt={`Cover photo for ${post.title}`} fill />
            </div>
          )}
          <TutorialTitle
            title={post.title}
            excerpt={post.excerpt}
            date={post.publishedTime}
            readingTime={post.readingTime}
            slug={post.slug}
          />
        </article>
      </div>
    </React.Fragment>
  )
}

export default TutorialListItem
