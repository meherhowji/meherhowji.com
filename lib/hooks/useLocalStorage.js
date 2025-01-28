import { useState, useEffect } from 'react'

export default function useLocalStorage(key) {
  const [data, setData] = useState(false)

  useEffect(() => {
    let item = localStorage.getItem(key)
    item ? setData(JSON.parse(item)) : setData(false)
  }, [])

  useEffect(() => {
    localStorage.setItem(key, JSON.parse(data))
  }, [key, data])

  return [data, setData]
}
