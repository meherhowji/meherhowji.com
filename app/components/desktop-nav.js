import { ArticleIcon } from "@/public/assets/svg-icons/articles.svg";
import { ArticleIcn } from "@/public/assets/svg-icons/newsletter.svg";
import { ArticleIco } from "@/public/assets/svg-icons/courses.svg";
import { ArticleIc } from "@/public/assets/svg-icons/user-login.svg";
import ThemeSwitch from "@/components/theme-switch";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/logo.svg";
import styles from "@/styles/component-css/desktop-nav.module.scss";

function DesktopNav({ onMobileNavToggle, onFooter }) {
  return (
    <nav className={`${styles.navbar} navbar`}>
      <div className={`${styles.container} container`}>
        {!onFooter && (
          <div className={`${styles.navbarBrand} navbar-brand`}>
            <Link href="/" passHref className={`${styles.navbarItem} navbar-item`}>
              <Image
                src={Logo}
                alt="Meher+Howji logo"
                className={styles.brandLogo}
                width="36"
                height="36"
                priority={true}
              />
              {/* <span className={`${styles.brandName} ${styles.textGradient}`}>meherhowji</span> */}
            </Link>
            <span className={`${styles.navbarBurger} navbar-burger`} onClick={onMobileNavToggle}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        )}

        <div className="navbar-menu">
          <div className={`${styles.navbarEnd} navbar-end ${onFooter ? styles.alwaysLight : ""}`}>
            <Link
              href="/articles"
              passHref
              className="navbar-item"
              data-sal="fade"
              style={{
                "--sal-duration": "1s",
                "--sal-delay": "0.2s",
              }}
            >
              <span className={`${styles.icon} icon`}>
                <ImNewspaper />
              </span>
              <span>Articles</span>
            </Link>

            <Link href="/courses" passHref className="navbar-item">
              <span className={`${styles.icon} icon`}>
                <RiBookletFill />
              </span>
              <span>Courses</span>
            </Link>

            <Link href="/newsletter" passHref className="navbar-item">
              <span className={`${styles.icon} icon`}>
                <IoMdMail />
              </span>
              <span>Newsletter</span>
            </Link>

            {!onFooter && (
              <>
                <span className="navbar-item">|</span>

                <Link href="/signup" passHref className="navbar-item">
                  <span className={`${styles.icon} icon`}>
                    <HiUserCircle />
                  </span>
                  <span className={styles.accessibleHiddenText}>Sign up</span>
                </Link>

                <span className="navbar-item">
                  <ThemeSwitch />
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DesktopNav;
