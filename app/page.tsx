import type { Metadata } from 'next'
import Hero from '@/components/hero'

export default function Home() {
  return <Hero />
}

// TODO: complete the metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://meherhowji.com'),
  title: {
    default: 'Meher Howji',
    template: '%s | Meher Howji',
  },
  description:
    "I am Meher. I'm a YouTuber, Udemy Trainer & a technologist. On this site I share courses and articles that will help you build web apps with a deeper insight into web technologies.",
  generator: 'Next.js',
  creator: 'Meher Howji',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      // -1, google chooses the length that it believes is effective to help users discover your content
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
}
