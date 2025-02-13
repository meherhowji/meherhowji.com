'use client'
import { useEffect, useState, useRef, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/router'
import Link from 'next/link'
import debounce from 'lodash.debounce'
import Image from 'next/image'
import throttle from 'lodash.throttle'
import useSWR from 'swr'

// import TutorialLayout from '@/layouts/tutorialLayout'
import { TableOfContent, ViewCounter } from '@/components'
import { fetcher, swrOptions } from '@/lib/utils/fetcher.js'
import distanceToNow from '@/lib/utils/dateRelative.js'
import useWindowDimensions from '@/lib/hooks/useWindowDimensions'
// import authorThumb from '@/public/assets/author/32x32.png'
// import cn from 'classnames'
// import css from './slug.module.scss'

export default function Post({ postDetails: p, backlinks, toc, prevNext }) {
  const router = useRouter()
  const contentSectionRef = useRef(null)
  const [hasCalculated, setHasCalculated] = useState(false)
  const [contentBounds, setContentBounds] = useState({})
  // defaulting to height of 1 so that rootMargin doesn't yell
  const { height = 1 } = useWindowDimensions()
  const { data: likesCount } = useSWR(`/api/get-likes?slug=${p.slug}`, fetcher, swrOptions)

  const { ref: coverImageRef, inView: coverInView } = useInView({
    threshold: 0,
  })

  const { ref: stickyRef, inView } = useInView({
    threshold: 0,
    rootMargin: '-50% 0% -50% 0%',
  })

  const { ref: bottomRef, inView: bottomInView } = useInView({
    threshold: 0,
    // 250 = 440/2 + 30, 440 is height of the scroller, 30 is the bottom most <p> tag margin
    rootMargin: `0px 0px ${250 - height / 2}px 0px`,
  })

  useEffect(() => {
    const calculateBodySize = throttle(() => {
      const contentSection = contentSectionRef.current

      if (!contentSection) return

      /**
       * If we haven't checked the content's height before,
       * we want to add listeners to the content area's
       * imagery to recheck when it's loaded
       */
      if (!hasCalculated) {
        const debouncedCalculation = debounce(calculateBodySize)
        const $imgs = contentSection.querySelectorAll('img')

        $imgs.forEach($img => {
          // If the image hasn't finished loading then add a listener
          if (!$img.complete) $img.onload = debouncedCalculation
        })

        // Prevent rerun of the listener attachment
        setHasCalculated(true)
      }

      // Set the height and offset of the content area
      setContentBounds(contentSection.getBoundingClientRect())
    }, 20)

    calculateBodySize()
    window.addEventListener('resize', calculateBodySize)
    return () => window.removeEventListener('resize', calculateBodySize)
  }, [hasCalculated])

  return (
    <TutorialLayout
      title={p.title}
      excerpt={p.excerpt}
      publishedTime={p.publishedTime}
      modifiedTime={p.modifiedTime}
      tags={p.tags}>
      {router.isFallback ? (
        <div>Loading</div>
      ) : (
        <div className="container">
          <div className={cn(css.postHeader)}>
            <div className="columns is-centered">
              <header className="column is-two-thirds ">
                <h1 className="has-text-centered">{p.title}</h1>
                <h3 className={cn('has-text-centered', css.postDetailSubtitle)}>{p.excerpt}</h3>
                <div className={css.postDetailMeta}>
                  <figure className="image is-24x24">
                    <Image
                      className={cn('is-rounded')}
                      width={24}
                      height={24}
                      quality={100}
                      src={authorThumb}
                      alt={`${p.author} avatar image`}
                    />
                  </figure>
                  <span rel="author" className={cn(css.authorName)}>
                    {p.author}
                  </span>
                  <span>
                    <time className={css.readingTime}>{p.readingTime}</time>
                    <i>·</i>
                    <time className={css.authorTime}>
                      {p.modifiedTime ? distanceToNow(new Date(p.modifiedTime)) : 'Unpublished'}
                    </time>
                    <i>·</i>
                    <span className={css.pageViews}>
                      <ViewCounter slug={p.slug} trackView />
                    </span>
                    <i>·</i>
                    {!(likesCount && likesCount.error) ? <span>{likesCount} Likes</span> : '-'}
                  </span>
                </div>
              </header>
            </div>
          </div>

          <div className="pos-rel">
            <div ref={contentSectionRef}>
              <aside className={css.toc}>
                <TableOfContent
                  list={toc}
                  contentBounds={contentBounds}
                  inView={inView}
                  bottomInView={bottomInView}
                  coverInView={coverInView}
                  likeMeta={{
                    currentLikes: likesCount,
                    postSlug: p.slug,
                  }}
                />
              </aside>

              <article>
                <div className={css.refMakesTocCenterSticky} ref={stickyRef} />
                <div className={css.refMakesTocBottomSticky} ref={bottomRef} />
                <ActualPostContent p={p} backlinks={backlinks} />
              </article>
            </div>
          </div>
        </div>
      )}
    </TutorialLayout>
  )
}

function ActualPostContent({ p, backlinks }) {
  return useMemo(() => {
    return (
      <>
        <div className="columns is-centered">
          <div className={cn('column is-three-fifths', css.postDetailContent)}>
            {/* <Mdx code={p.body.code} /> */}
            <div className={css.backlinks}>
              <hr />
              <h3>Backlinks, or posts that mention this article</h3>
              <div>
                {backlinks.length
                  ? backlinks.map(({ title, slug }) => (
                      <span key={title}>
                        <Link href={`/${slug}`}>{title}</Link>
                      </span>
                    ))
                  : 'No mentions yet'}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }, [p, backlinks])
}
