import { updater } from '@/lib/utils/fetcher.js'
import { useEffect, useState, useRef } from 'react'
import cn from 'classnames'
import css from './likeButton.module.scss'
import debounce from 'lodash.debounce'
import useSWRMutation from 'swr/mutation'
import add from 'ramda/es/add'

export default function LikeButton({ postSlug, currentLikes }) {
  let [likeCount, setLikeCount] = useState(0)
  const [clicked, setClicked] = useState(false)
  const [serverLikes, setServerLikes] = useState(0)
  const [toggleHeart, setToggleHeart] = useState(false)
  const { trigger: addLike } = useSWRMutation(`/api/add-likes`, updater)

  const delayedAddLike = useRef(
    debounce((postSlug, totalLikes) => addLike({ slug: postSlug, count: totalLikes }), 1200),
  )

  const incrementLikeCount = () => {
    if (likeCount <= 15) {
      setClicked(true)
      setLikeCount(likeCount => likeCount + 1)
      delayedAddLike.current(postSlug, add(likeCount + 1, serverLikes)) // likeCount is updated asyncly
    }
    setTimeout(() => setClicked(false), 200)
  }

  useEffect(() => {
    if (likeCount >= 16) {
      setToggleHeart(!toggleHeart)
    }
  }, [likeCount])

  useEffect(() => {
    if (postSlug) {
      setLikeCount(0)
    }
    if (currentLikes) {
      setServerLikes(currentLikes)
    }
  }, [postSlug])

  useEffect(() => {
    if (likeCount === 0 && currentLikes) {
      setServerLikes(currentLikes)
    }
  }, [currentLikes])

  return (
    <div className={css.likes} onClick={incrementLikeCount}>
      <span className={cn({ [css.liked]: toggleHeart })}>
        <div className={css.heartAnimationOne}></div>
        <div className={css.heartAnimationTwo}></div>
      </span>
      <div className={css.svgWrapper}>
        <div className={cn(css.svg, css['palette-' + likeCount], { [css.pulse]: clicked })}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
            <g>
              <path
                id="svg_2"
                d="m72.71055,10.75989c-3.51621,-0.00885 -6.99933,0.6765 -10.24935,2.01744c-3.25056,1.34089 -6.20408,3.31021 -8.69148,5.79539c-1.00457,1.00457 -2.36697,1.56959 -3.78794,1.56959s-2.78347,-0.56497 -3.78853,-1.56959c-5.02502,-5.01339 -11.83492,-7.82654 -18.93337,-7.82219s-13.90484,2.82586 -18.92486,7.84533c-5.01948,5.01948 -7.84098,11.82602 -7.84533,18.92486c-0.0044,7.09874 2.80934,13.90865 7.82219,18.93475l26.51973,26.51973l0,-0.00054c4.01827,4.01768 9.4674,6.2748 15.14864,6.2748c5.68213,0.00054 11.13126,-2.25653 15.15008,-6.27366l26.52111,-26.52111c3.75035,-3.74214 6.30616,-8.51308 7.34233,-13.70873s0.50587,-10.58241 -1.52265,-15.47666c-2.02907,-4.8941 -5.4651,-9.07578 -9.87272,-12.0149c-4.40816,-2.93912 -9.58996,-4.50362 -14.8871,-4.49427l-0.00069,-0.0003l-0.00005,0.00005z"
              />
            </g>
          </svg>
        </div>
        <div className={css.count}>
          <span>{add(likeCount, serverLikes)}</span>
        </div>
      </div>
    </div>
  )
}
