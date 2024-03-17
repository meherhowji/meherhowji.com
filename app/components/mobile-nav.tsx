import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import UdemyIcon from "@/public/assets/social-icons/udemy.svg";
import YoutubeIcon from "@/public/assets/social-icons/youtube.svg";
import LinkedinIcon from "@/public/assets/social-icons/linkedin.svg";
import InstagramIcon from "@/public/assets/social-icons/instagram.svg";
import styles from "@/styles/component-css/mobile-nav.module.scss";

interface MobileNavProps {
  toggleMenu: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({ toggleMenu }) => {
  useEffect(() => {
    document.querySelector(".navbar")?.classList.toggle(`${styles.slideDownAppear}`);
  }, [toggleMenu]);

  return (
    <nav className={`${styles.mobileNav} navbar`} role="navigation" aria-label="dropdown navigation">
      <div className={`${styles.socialMedia}`}>
        <Link href="https://www.udemy.com/user/meher-howji/">
          <Image src={UdemyIcon} aria-hidden="true" width="20" height="20" alt="Udemy" />
        </Link>

        <Link href="https://www.youtube.com/@meherhowji">
          <Image src={YoutubeIcon} aria-hidden="true" width="20" height="20" alt="Youtube" />
        </Link>

        <Link href="https://in.linkedin.com/in/meherranjan">
          <Image src={LinkedinIcon} aria-hidden="true" width="20" height="20" alt="LinkedIn" />
        </Link>

        <Link href="https://instagram.com/meherranjan">
          <Image src={InstagramIcon} aria-hidden="true" width="20" height="20" alt="Instagram" />
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
