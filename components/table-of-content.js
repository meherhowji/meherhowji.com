import { useEffect, useState } from 'react'
import cn from 'classnames'
import css from './tableOfContent.module.scss'
import throttle from 'lodash.throttle'
import { LikeButton } from '@/components'

export default function TableOfContent({
  inView,
  bottomInView,
  coverInView,
  contentBounds,
  likeMeta,
  list,
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const { height: articleHeight } = contentBounds
    const handleScroll = throttle(() => {
      // 440 is the image height to get the true reading scroll
      const percentComplete = (window.scrollY / (articleHeight - 440)) * 100
      setProgress(clamp(+percentComplete.toFixed(2), -2, 100))
    }, 20)

    if (articleHeight) {
      window.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }
  }, [contentBounds])

  return (
    <div className={cn(css.indicator, bottomInView ? css.absoluteBottom : inView ? css.fixed : '')}>
      <div className={css.content}>
        <div
          className={cn(css.topArrow, { [css.disappear]: coverInView })}
          onClick={() => window.scrollTo(0, 0)}>
          <GoToTopArrow />
        </div>
        <div className={css.indicatorWrapper}>
          <div className={css.indicatorOverlay} style={{ height: `${progress}%` }}></div>
        </div>
        <div className={css.headingList}>
          {list &&
            list.map(
              heading =>
                heading.level === 2 && (
                  <div
                    className={cn(css.headingItem, {
                      [css.disappear]: coverInView,
                    })}
                    key={heading.key}>
                    <h5>
                      <div className={css.textWrapper}>
                        <a href={`#${heading.key}`}>{heading.text}</a>
                      </div>
                    </h5>
                  </div>
                ),
            )}
          <div className={cn({ [css.disappear]: coverInView })}>
            {/* TODO: likes buttom renders at every scroll event */}
            <LikeButton {...likeMeta} />
          </div>
        </div>
      </div>
    </div>
  )
}

const GoToTopArrow = () => (
  <svg width="9" height="12" viewBox="0 0 9 12" fill="#fff" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.85355 0.646446C4.65829 0.451184 4.34171 0.451184 4.14645 0.646446L0.964467 3.82843C0.769204 4.02369 0.769204 4.34027 0.964467 4.53553C1.15973 4.7308 1.47631 4.7308 1.67157 4.53553L4.5 1.70711L7.32843 4.53553C7.52369 4.7308 7.84027 4.7308 8.03553 4.53553C8.2308 4.34027 8.2308 4.02369 8.03553 3.82843L4.85355 0.646446ZM5 12L5 1L4 1L4 12L5 12Z"></path>
  </svg>
)

/**
 * https://github.com/David-Way/gatsby-theme-novela/
 * Clamp a number between min and max
 *
 * @param {number} value The number you want clamped
 * @param {number} min
 * @param {number} max
 *
 * @example
 *    clamp(5, 1, 10) 5
 *    clamp(50, 1, 10) 10
 *    clamp(0.5, 1, 10) 1
 */
export const clamp = (value, min, max) => (value < min ? min : value > max ? max : value)
