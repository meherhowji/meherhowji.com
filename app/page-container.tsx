'use client';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import DesktopNav from '@/app/components/desktop-nav';
import MobileNav from '@/app/components/mobile-nav';
import Footer from '@/app/components/footer';

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
        style={{ height: '100vh' }}
      >
        <DesktopNav onMobileNavToggle={toggleMobileNav} onFooter={false} />
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default PageContainer