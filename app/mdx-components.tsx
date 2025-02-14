import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Copy from '@/public/assets/icons/copy.svg'
import Copied from '@/public/assets/icons/copied.svg'

// Component Modifiers
function H2({ children }) {
  return (
    <h2 id={`${slugify(children)}`} className="anchor-heading">
      {children}
    </h2>
  )
}

function Anchor({ children, ...props }) {
  return (
    <a {...props} className="anchor-markdown">
      {children}
    </a>
  )
}

function Pre({ children, raw, asdf, ...props }) {
  return (
    <pre {...props}>
      <CopyButton text={raw} />
      {children}
    </pre>
  )
}

function CopyButton({ text }) {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 1200)
  }

  return (
    <button disabled={isCopied} onClick={copy} className={'copy-to-clipboard'}>
      {isCopied ? (
        <Image src={Copied} width="13" height="13" alt="Code copied" />
      ) : (
        <Image src={Copy} width="13" height="13" alt="Copy code" />
      )}
    </button>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: H2,
    a: Anchor,
    pre: Pre,
		...components
  }
}
