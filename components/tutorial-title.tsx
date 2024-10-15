'use client'
import { useRef, useState, useEffect, RefObject } from 'react'
import Link from 'next/link'
import css from '@/styles/component-css/tutorial-list.module.scss'

interface TutorialTitleProps {
  title: string
  excerpt: string
  slug: string
  date: string
  readingTime: string
}

const TutorialTitle: React.FC<TutorialTitleProps> = ({ title, excerpt, slug, date, readingTime }) => {
  const elem: RefObject<HTMLSpanElement> = useRef(null)
  const [isTitleMultiLine, setIsTitleMultiLine] = useState(false)

  useEffect(() => {
    if (elem.current) {
      setIsTitleMultiLine(elem.current.getClientRects().length > 1)
    }
  }, [elem])

  return (
    <div className={css.postContent}>
      <h2 className={`${css.postTitle}`}>
        <span ref={elem}>
          <Link href={`/${slug}`} as={`/${slug}`}>
            {title}
          </Link>
        </span>
      </h2>
      {!isTitleMultiLine && <p className={`${css.postSubTitle}`}>{excerpt}</p>}
      {/* <time className={css.readingTime}>{readingTime}</time> */}
      {/* <time>{distanceToNow(new Date(date))}</time> */}
    </div>
  )
}

export default TutorialTitle
