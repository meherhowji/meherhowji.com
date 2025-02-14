'use client';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import DesktopNav from '@/components/desktop-nav';
import MobileNav from '@/components/mobile-nav';
import Footer from '@/components/footer';

const PageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isComponentLoaded, setIsComponentLoaded] = useState(true);

  // Toggles the state of the mobile navigation menu
  function toggleMobileNav() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isComponentLoaded) {
      setIsComponentLoaded(false);
    }
  }

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => (isMobileMenuOpen ? toggleMobileNav() : null),
  });

  return (
    <div className="mainContainer">
      <MobileNav showOnToggle={isMobileMenuOpen} />
      <main
        className={`pageContainer ${
          isMobileMenuOpen ? 'slideDownOnMobile showOnMobile' : ''
        }`}
        {...swipeHandlers}
      >
        <DesktopNav onMobileNavToggle={toggleMobileNav} onFooter={false} />
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default PageContainer