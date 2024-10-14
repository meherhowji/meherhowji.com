import React from "react";
import Image from "next/image";
import Link from "next/link";
import DP from "@/public/assets/brand/meher-dp.jpg";
import styles from "@/styles/component-css/hero.module.scss";

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div>
          <h1 className={styles.heroTitle}>Hello! I am Meher</h1>
          <h2 className={styles.heroSubTitle}>
            <span>I&apos;m a technologist and creator on </span>
            <Link href="https://www.udemy.com/user/meher-howji/" passHref className={styles.link}>
              Udemy
            </Link>
            <span> & </span>
            <Link href="https://www.youtube.com/meherhowji" passHref className={styles.link}>
              YouTube
            </Link>
          </h2>
          <div className={styles.heroSubTitleText}>
            <p>
              On this site I share courses and articles that will help you build web apps with a deeper insight into web
              technologies.
            </p>
            <p>
              <span>I share snippets of technology on my weekly newsletter </span>
              <Link href="/newsletter" passHref className={styles.link}>
                Sunday Syntax
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.heroImage}>
        <Image src={DP} width={400} height={325} alt="Photo of Meher Howji" placeholder="empty" priority={true} />
      </div>
    </section>
  );
};

export default Hero;
