import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import AppShell from '@/components/app-shell'
import '@/styles/globals.scss'
import styles from '@/styles/page-css/layout.module.scss'

const inter = Inter({ subsets: ['latin'], weight: ['300', '500', '700', '900'], variable: '--font-inter' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="shortcut icon" href="/favicons/favicon.ico" sizes="any" />
      <body className={`${inter.className} ${styles.bodyContainer}`}>
        <ThemeProvider themes={['light', 'dark']} defaultTheme="dark">
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  )
}

// why SuppressHydrationWarning? - https://github.com/shadcn-ui/ui/issues/5552
