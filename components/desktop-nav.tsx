import Image from "next/image";
import Link from "next/link";
import ThemeSwitch from "@/components/theme-switch";
import styles from "@/styles/component-css/desktop-nav.module.scss";

interface DesktopNavProps {
  onMobileNavToggle: () => void;
  onFooter: boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ onMobileNavToggle, onFooter }) => {
  return (
    <nav className={`${styles.navbar}`}>
      {!onFooter && (
        <div className={`${styles.navbarBrand}`}>
          <Link href="/" passHref>
            <Image
              src="./assets/brand/logo.svg"
              alt="Meher+Howji logo"
              className={styles.brandLogo}
              width="36"
              height="36"
              priority={true}
            />
          </Link>
          <span className={`${styles.mobileNavbarMenuIcon}`} onClick={onMobileNavToggle}>
            <span className={styles.icon}>
              <svg width="20px" height="20px" role="img" aria-label="articles icon">
                <use href="/assets/sprite.svg#hamburger" />
              </svg>
            </span>
          </span>
        </div>
      )}

      <div className={`${styles.navbarMenuList} ${onFooter ? styles.alwaysLight : ""}`}>
        <Link href="/articles" passHref>
          <button>
            <span className={styles.icon}>
              <svg width="15px" height="15px" role="img" aria-label="articles icon">
                <use href="/assets/sprite.svg#articles" />
              </svg>
            </span>
            <span>Articles</span>
          </button>
        </Link>

        <Link href="/courses" passHref>
          <button>
            <span className={styles.icon}>
              <svg className="icon" width="15px" height="15px" role="img" aria-label="courses icon">
                <use href="/assets/sprite.svg#courses" />
              </svg>
            </span>
            <span>Courses</span>
          </button>
        </Link>

        <Link href="/newsletter" passHref>
          <button>
            <span className={styles.icon}>
              <svg className="icon" width="15px" height="15px" role="img" aria-label="newsletter icon">
                <use href="/assets/sprite.svg#newsletter" />
              </svg>
            </span>
            <span>Newsletter</span>
          </button>
        </Link>

        {!onFooter && (
          <>
            <span className={styles.menuSep}>|</span>
            <Link href="/signup" passHref>
              <button>
                <span className={`${styles.icon} ${styles.m0}`}>
                  <svg className="icon" width="14px" height="14px" role="img" aria-label="userlogin icon">
                    <use href="/assets/sprite.svg#userlogin" />
                  </svg>
                </span>
                <span className={styles.accessibleHiddenText}>Sign up</span>
              </button>
            </Link>
            <span className={styles.themeBtn}>
              <ThemeSwitch />
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;
