import type { ComponentProps, ReactNode } from 'react'
import CopyButton from '@/components/copy-button'
import ExternalLinkIcon from '@/public/assets/icons/external-link-inline.svg'
import { slugify } from '@/lib/utils/mdxUtils'

function heading(Tag: 'h2' | 'h3') {
  return function Heading({ children, ...props }: ComponentProps<typeof Tag>) {
    return (
      <Tag id={slugify(String(children))} className="anchor-heading" {...props}>
        {children}
      </Tag>
    )
  }
}

function Anchor({ children, href = '', ...props }: ComponentProps<'a'>) {
  const isExternal = /^https?:\/\//.test(href)
  if (!isExternal) {
    return (
      <a href={href} className="anchor-markdown" {...props}>
        {children}
      </a>
    )
  }
  return (
    <a href={href} className="anchor-markdown external-link" target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <ExternalLinkIcon className="external-link-icon" aria-hidden="true" />
    </a>
  )
}

type PreProps = ComponentProps<'pre'> & { 'data-raw'?: string; 'data-title'?: string }

function Pre({ children, ...props }: PreProps) {
  const { 'data-raw': raw, 'data-title': title, ...rest } = props
  return (
    <div className="code-block">
      {title && <div className="code-title">{title}</div>}
      <div className="code-body">
        <CopyButton text={raw ?? ''} />
        <pre {...rest}>{children}</pre>
      </div>
    </div>
  )
}

export const mdxComponents: Record<string, (props: { children?: ReactNode }) => ReactNode> = {
  h2: heading('h2'),
  h3: heading('h3'),
  a: Anchor,
  pre: Pre,
}
