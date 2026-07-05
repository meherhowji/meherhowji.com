import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import AppShell from '@/components/app-shell'
import '@/styles/globals.scss'
import styles from '@/styles/page-css/layout.module.scss'

const inter = Inter({ subsets: ['latin'], weight: ['300', '500', '700', '900'], variable: '--font-inter' })

// Favicons via the Metadata API (app/favicon.ico still covers the base .ico by convention).
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicons/safari-icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicons/apple-icon-180x180.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${styles.bodyContainer}`}>
        <ThemeProvider themes={['light', 'dark']} defaultTheme="dark">
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  )
}

// why SuppressHydrationWarning? - https://github.com/shadcn-ui/ui/issues/5552
