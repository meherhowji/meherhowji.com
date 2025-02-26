'use client'
import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import DesktopNav from '@/components/desktop-nav'
import MobileNav from '@/components/mobile-nav'
import Footer from '@/components/footer'
import '@/styles/globals.scss'
import styles from '@/styles/page-css/layout.module.scss'

const inter = Inter({ subsets: ['latin'], weight: ['300', '500', '700', '900'], variable: '--font-inter' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isComponentLoaded, setIsComponentLoaded] = useState(true)

  // Toggles the state of the mobile navigation menu
  function toggleMobileNav() {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (isComponentLoaded) {
      setIsComponentLoaded(false)
    }
  }

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => (isMobileMenuOpen ? toggleMobileNav() : null),
  })

  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="shortcut icon" href="/favicons/favicon.ico" sizes="any" />
      <body className={`${inter.className} ${styles.bodyContainer}`}>
        <ThemeProvider themes={['light', 'dark']} defaultTheme="dark">
          <div className="boxes-here">
            {/* Header */}
            <header>
              <MobileNav showOnToggle={isMobileMenuOpen} />
              <DesktopNav onMobileNavToggle={toggleMobileNav} isFooter={false} />
            </header>

            {/* Main Container */}
            <main
              {...swipeHandlers}
              className={[styles.pageContainer, isMobileMenuOpen && styles.slideDownOnMobile].join(' ')}>
              <>{children}</>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

// why SuppressHydrationWarning? - https://github.com/shadcn-ui/ui/issues/5552
