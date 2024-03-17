import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'
import UdemyIcon from '@/public/assets/social-icons/udemy.svg'
import YoutubeIcon from '@/public/assets/social-icons/youtube.svg'
import LinkedinIcon from '@/public/assets/social-icons/linkedin.svg'
import InstagramIcon from '@/public/assets/social-icons/instagram.svg'
import styles from './mobileNav.module.scss'

function MobileNav({ toggleMenu }) {
  useEffect(() => {
    document.querySelector('.navbar').classList.toggle(`${styles.slideDownAppear}`)
  }, [toggleMenu])

  return (
    <nav
      className={cn(styles.mobileNav, 'navbar')}
      role="navigation"
      aria-label="dropdown navigation">
      <div className={cn(styles.socialMedia)}>
        <Link href="https://www.udemy.com/user/meher-howji/" passHref className="navbar-item">
          <span className={cn(styles.icon, 'icon')}>
            <Image src={UdemyIcon} aria-hidden="true" width="20" height="20" alt="Udemy" />
          </span>
        </Link>

        <Link href="https://www.youtube.com/@meherhowji" passHref className="navbar-item">
          <span className={cn(styles.icon, 'icon')}>
            <Image src={YoutubeIcon} aria-hidden="true" width="20" height="20" alt="Youtube" />
          </span>
        </Link>

        <Link href="https://in.linkedin.com/in/meherranjan" passHref className="navbar-item">
          <span className={cn(styles.icon, 'icon')}>
            <Image src={LinkedinIcon} aria-hidden="true" width="20" height="20" alt="LinkedIn" />
          </span>
        </Link>

        <Link href="https://instagram.com/meherranjan" passHref className="navbar-item">
          <span className={cn(styles.icon, 'icon')}>
            <Image src={InstagramIcon} aria-hidden="true" width="20" height="20" alt="Instagram" />
          </span>
        </Link>
      </div>
      <hr />
      <div className={cn(styles.menuList)}>
        <Link href="/" passHref className="">
          Home
        </Link>
        <Link href="/articles" passHref className="">
          Articles
        </Link>
        <Link href="/courses" passHref className="">
          Courses
        </Link>
        <Link href="/newsletter" passHref className="">
          Newsletter
        </Link>
      </div>
    </nav>
  )
}

export default MobileNav
