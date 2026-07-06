'use client'
import { useState } from 'react'
import Image from 'next/image'
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
      {isCopied ? (
        <Image src={Copied} width="13" height="13" alt="Code copied" />
      ) : (
        <Image src={Copy} width="13" height="13" alt="Copy code" />
      )}
    </button>
  )
}
