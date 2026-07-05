'use client'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { useSwipeable } from 'react-swipeable'
import DesktopNav from '@/components/desktop-nav'
import MobileNav from '@/components/mobile-nav'
import Footer from '@/components/footer'
import styles from '@/styles/page-css/layout.module.scss'

// Client shell that owns the mobile-nav open state and swipe handling.
// Kept out of the root layout so RootLayout can stay a server component.
export default function AppShell({ children }: { children: ReactNode }) {
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
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
