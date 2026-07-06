'use client'
import { useState } from 'react'
import Copy from '@/public/assets/icons/copy.svg'
import Copied from '@/public/assets/icons/copied.svg'

export default function CopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1200)
  }

  return (
    <button disabled={isCopied} onClick={copy} className="copy-to-clipboard" aria-label="Copy code">
      {isCopied ? <Copied width={14} height={14} /> : <Copy width={14} height={14} />}
    </button>
  )
}
