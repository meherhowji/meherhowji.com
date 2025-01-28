'use client'
import { useEffect } from 'react'
import { fetcher } from '@/lib/utils/fetcher.js'
import useSWR from 'swr'

export default function ViewCounter({ slug, trackView, show = true, isPage = false }) {
  const { data } = useSWR('/api/views', fetcher)
  const viewsForSlug = data && data.find(view => view.slug_name === `${slug}`)
  const viewCount = new Number(viewsForSlug?.view_count || 0)

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPage,
          userBrowserDetails: getUserDetails(),
        }),
      })

    if (trackView) {
      registerView()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  return show && <span>{data ? `${viewCount} views` : ''}</span>
}

function getUserDetails() {
  const userAgent = navigator.userAgent
  const userLanguage = navigator.language || navigator.userLanguage
  const windowWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const screenWidth = window.screen.width
  const screenHeight = window.screen.height
  const referrer = document.referrer || ''
  const deviceOrientation =
    (window.screen.orientation && window.screen.orientation.type) || window.orientation || ''

  return {
    userAgent,
    userLanguage,
    windowWidth,
    windowHeight,
    screenWidth,
    screenHeight,
    referrer,
    deviceOrientation,
  }
}
