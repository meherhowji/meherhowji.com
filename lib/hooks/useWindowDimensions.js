import { useState, useEffect } from 'react'
// Source: https://usehooks.com/useWindowSize/
// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

export default function useWindowDimensions() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
