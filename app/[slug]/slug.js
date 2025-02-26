// TODO: start working here for updating the post page

'use client'
import { useEffect, useState, useRef, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { TableOfContent, ViewCounter } from '@/components'
import useWindowDimensions from '@/lib/hooks/useWindowDimensions'
import css from '@/styles/page-css/article.module.scss'

// import { fetcher, swrOptions } from '@/lib/utils/fetcher.js'
// import distanceToNow from '@/lib/utils/dateRelative.js'
// import useSWR from 'swr'
// import Image from 'next/image'
// import authorThumb from '@/public/assets/author/32x32.png'

export default function Post({ post }) {
  const fm = post.frontmatter
  const router = useRouter()
  const contentSectionRef = useRef(null)
  const [hasCalculated, setHasCalculated] = useState(false)
  const [contentBounds, setContentBounds] = useState({})
  // defaulting to height of 1 so that rootMargin doesn't yell
  const { height = 1 } = useWindowDimensions()
  // const { data: likesCount } = useSWR(`/api/get-likes?slug=${fm.slug}`, fetcher, swrOptions)

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
    <>
      {router.isFallback ? (
        <div>Loading</div>
      ) : (
        <section className={css.container}>
          {/* className={`${styles.page} ${styles.nonLandingScreen}`}> */}
          <header className="column is-two-thirds ">
            <h1 className="has-text-centered">{fm.title}</h1>
            <h3 className={`has-text-centered ${css.postDetailSubtitle}`}>{fm.excerpt}</h3>
            <div className={css.postDetailMeta}>
              {/* <figure className={`${css.figureImage} image is-24x24`}>
                    <Image
                      className={'is-rounded'}
                      width={24}
                      height={24}
                      quality={100}
                      src={authorThumb}
                      alt={`${fm.author} avatar image`}
                    />
                  </figure> */}
              <span rel="author" className={css.authorName}>
                {fm.author}
              </span>
              <span className={css.meta}>
                <time className={css.readingTime}>{fm.readingTime}</time>
                <i>·</i>
                <time className={css.authorTime}>
                  {/* {fm.modifiedTime ? distanceToNow(new Date(fm.modifiedTime)) : 'Unpublished'} */}
                </time>
                <i className={css.sep}>·</i>
                <span className={css.pageViews}>{/* <ViewCounter slug={fm.slug} trackView /> */}</span>
                <i>·</i>
                {/* {!(likesCount && likesCount.error) ? <span>{likesCount} Likes</span> : '-'} */}
              </span>
            </div>
          </header>

          <section>
            <div ref={contentSectionRef}>
              <aside className={css.toc}>
                <TableOfContent
                  list={fm.toc}
                  contentBounds={contentBounds}
                  inView={inView}
                  bottomInView={bottomInView}
                  coverInView={coverInView}
                  // likeMeta={{
                  //   currentLikes: likesCount,
                  //   postSlug: fm.slug,
                  // }}
                />
              </aside>

              <article>
                <div className={css.refMakesTocCenterSticky} ref={stickyRef} />
                <div className={css.refMakesTocBottomSticky} ref={bottomRef} />
                <ActualPostContent post={post} backlinks={fm.backlinks} />
              </article>
            </div>
          </section>
        </section>
      )}
    </>
  )
}

function ActualPostContent({ post, backlinks = [] }) {
  return useMemo(() => {
    return (
      <>
        <div className="columns is-centered">
          <div className={`column is-three-fifths ${css.postDetailContent}`}>
            <MDXRemote {...post} />
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
  }, [post, backlinks])
}
