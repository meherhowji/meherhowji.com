import { useRef, useState, useEffect } from 'react'
import cn from 'classnames'
import Link from 'next/link'
// import distanceToNow from '@/lib/utils/dateRelative.js'
// import readingTime from 'reading-time'
import css from './tutorialList.module.scss'

const TutorialTitle = ({ title, excerpt, slug, date, readingTime }) => {
  const elem = useRef(null)
  const [classname, setClass] = useState(0)

  useEffect(() => {
    // if the title goes into 2 lines, then don't show description for the post. #aesthetics :D
    setClass(elem.current.getClientRects().length)
  }, [setClass, elem])

  return (
    <div className={css.postDescription}>
      <h2 className={cn(css.postTitle)}>
        <span ref={elem}>
          <Link href={`/${[slug]}`} as={`/${slug}`}>
            {title}
          </Link>
        </span>
      </h2>
      <p className={cn(css.postSubTitle)}>{excerpt}</p>
      {/* <time className={css.readingTime}>{readingTime}</time> */}
      {/* <time>{distanceToNow(new Date(date))}</time> */}
    </div>
  )
}

export default TutorialTitle
