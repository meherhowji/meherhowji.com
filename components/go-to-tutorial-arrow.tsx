import Link from 'next/link'
import LeftArrow from '@/public/assets/icons/left-arrow.svg'
import RightArrow from '@/public/assets/icons/right-arrow.svg'
import type { PostMeta } from '@/db/markdown.d'
import css from './component-css/go-to-tutorial-arrow.module.scss'

export default function GoToTutorialArrow({
  target,
  direction,
}: {
  target: PostMeta | null
  direction: 'prev' | 'next'
}) {
  if (!target) return null

  const isNext = direction === 'next'
  const Arrow = isNext ? RightArrow : LeftArrow

  return (
    <Link
      href={`/${target.slug}`}
      className={`${css.arrow} ${isNext ? css.next : css.prev}`}
      aria-label={`${isNext ? 'Next' : 'Previous'}: ${target.title}`}>
      <Arrow width={44} height={44} />
    </Link>
  )
}
