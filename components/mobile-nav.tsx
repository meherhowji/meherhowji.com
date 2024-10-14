import Link from "next/link";
import styles from "@/styles/component-css/mobile-nav.module.scss";

interface MobileNavProps {
  showOnToggle: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({ showOnToggle }) => {
  return (
    <nav
      className={`${styles.mobileNav} ${showOnToggle ? styles.slideDownOnMobile : styles.slideUpOnMobile}`}
      role="navigation"
      aria-label="dropdown navigation"
    >
      <div className={`${styles.socialMedia}`}>
        <Link href="https://instagram.com/meherranjan">
          <svg width="15px" height="15px" role="img" aria-label="instagram icon">
            <use href="/assets/sprite.svg#instagram" />
          </svg>
        </Link>

        <Link href="https://www.youtube.com/@meherhowji">
          <svg width="15px" height="15px" role="img" aria-label="youtube icon">
            <use href="/assets/sprite.svg#youtube" />
          </svg>
        </Link>

        <Link href="https://in.linkedin.com/in/meherranjan">
          <svg width="15px" height="15px" role="img" aria-label="linkedin icon">
            <use href="/assets/sprite.svg#linkedin" />
          </svg>
        </Link>

        <Link href="https://www.udemy.com/user/meher-howji/">
          <svg width="15px" height="15px" role="img" aria-label="youtube icon">
            <use href="/assets/sprite.svg#udemy" />
          </svg>
        </Link>
      </div>
      <hr />
      <div className={`${styles.menuList}`}>
        <Link href="/">Home</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/courses">Courses</Link>
        <Link href="/newsletter">Newsletter</Link>
      </div>
    </nav>
  );
};

export default MobileNav;
