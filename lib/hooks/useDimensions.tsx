import { useState, useCallback, useEffect } from 'react'

export default function useDimensions(myRef: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const handleResize = useCallback(() => {
    if (myRef.current) {
      setWidth(myRef.current.offsetWidth)
      setHeight(myRef.current.offsetHeight)
    }
  }, [myRef])

  useEffect(() => {
    const element = myRef.current
    if (!element) return // wait until the element is available

    // Create a new ResizeObserver that calls handleResize whenever the element's size changes.
    const resizeObserver = new ResizeObserver(() => handleResize())
    resizeObserver.observe(element)

    // Optionally, call handleResize once to set initial dimensions.
    handleResize()

    return () => {
      resizeObserver.disconnect()
    }
  }, [myRef, handleResize])

  return { width, height }
}
