'use client'
import { useEffect, useState } from 'react'
import type { TocHeading } from '@/db/markdown.d'
import css from './component-css/table-of-content.module.scss'

const clamp = (value: number, min: number, max: number) => (value < min ? min : value > max ? max : value)

export default function TableOfContent({
  list,
  contentId = 'article-content',
}: {
  list: TocHeading[]
  contentId?: string
}) {
  const headings = (list ?? []).filter(h => h.level === 2)
  const [progress, setProgress] = useState(0)
  const [activeKey, setActiveKey] = useState('')

  // Reading-progress indicator: fill relative to the article body's scroll length.
  useEffect(() => {
    const el = document.getElementById(contentId)
    if (!el) return

    // rAF-throttled scroll handler (no lodash dep, one paint-aligned update per frame).
    // Progress tracks the whole page scroll (from the very top, i.e. through the H1
    // header) and reaches 100% when the article body's bottom hits the viewport bottom.
    let ticking = false
    const update = () => {
      const articleBottom = el.getBoundingClientRect().bottom + window.scrollY
      const end = articleBottom - window.innerHeight
      setProgress(clamp(end > 0 ? (window.scrollY / end) * 100 : 0, 0, 100))
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [contentId])

  // Active-heading highlight.
  useEffect(() => {
    const items = (list ?? []).filter(h => h.level === 2)
    if (!items.length) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length) setActiveKey(visible[0].target.id)
      },
      { rootMargin: '-10% 0% -70% 0%', threshold: 0 },
    )
    items.forEach(h => {
      const el = document.getElementById(h.key)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [list])

  if (!headings.length) return null

  return (
    <nav className={css.toc} aria-label="Table of contents">
      <button
        className={css.toTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top">
        <UpArrow />
      </button>

      <div className={css.content}>
        <div className={css.indicatorWrapper}>
          <div className={css.indicatorOverlay} style={{ height: `${progress}%` }} />
        </div>
        <ul className={css.headingList}>
          {headings.map(h => (
            <li key={h.key} className={h.key === activeKey ? `${css.headingItem} ${css.active}` : css.headingItem}>
              <a href={`#${h.key}`}>{h.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

const UpArrow = () => (
  <svg width="9" height="12" viewBox="0 0 9 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.85355 0.646446C4.65829 0.451184 4.34171 0.451184 4.14645 0.646446L0.964467 3.82843C0.769204 4.02369 0.769204 4.34027 0.964467 4.53553C1.15973 4.7308 1.47631 4.7308 1.67157 4.53553L4.5 1.70711L7.32843 4.53553C7.52369 4.7308 7.84027 4.7308 8.03553 4.53553C8.2308 4.34027 8.2308 4.02369 8.03553 3.82843L4.85355 0.646446ZM5 12L5 1L4 1L4 12L5 12Z" />
  </svg>
)
