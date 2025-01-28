import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.scss'

const inter = Inter({ subsets: ['latin'], weight: ['300', '500', '700', '900'], variable: '--font-inter' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* TODO: attr ^ suppresses error as ThemeProvider is a client comp but this file isnt, update package */}
      {/* 
			this is generated dynamically by manifest.ts in the app directory
			<link rel="manifest" href="/manifest.webmanifest" /> 
			*/}
      <link rel="shortcut icon" href="/favicons/favicon.ico" sizes="any" />
      <body className={`${inter.className} bodyContainer`}>
        <ThemeProvider themes={['light', 'dark']} defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
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
