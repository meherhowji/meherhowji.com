import React from "react";
import Image from "next/image";
import Link from "next/link";
import DP from "@/public/assets/components/meher-dp.jpg";
import styles from "@/styles/component-css/hero.module.scss";

interface HeroProps {
  courseInView: boolean; // Adjust the type as per your requirement
}

const Hero: React.FC<HeroProps> = ({ courseInView }) => {
  return (
    <>
      <section className={`${styles.hero} hero is-halfheight`}>
        <div className={`${styles.heroBody} hero-body`}>
          <div className="container has-text-centered is-max-widescreen">
            <div className="columns level is-variable is-8">
              <div className="column level-left has-text-left">
                <h1 className={styles.heroTitle}>
                  <span>Hello! I am Meher.</span>
                </h1>
                <h2 className={styles.heroSubTitle}>
                  <span>I&apos;m a </span>
                  <Link href="https://www.youtube.com/meherhowji" passHref className={styles.link}>
                    YouTuber
                  </Link>
                  <span>, </span>
                  <Link href="https://www.udemy.com/user/meher-howji/" passHref className={styles.link}>
                    Udemy Trainer
                  </Link>
                  <span> & a technologist.</span>
                </h2>
                <h3 className={styles.heroSubTitleText}>
                  On this site I share courses and articles that will help you build web apps with a deeper insight into
                  web technologies.
                </h3>
                <h4>
                  <span>I also share snippets of technology on my weekly newsletter </span>
                  <Link href="/newsletter" passHref className={styles.link}>
                    Sunday Syntax
                  </Link>
                  {/* <SubscribeToNewsletter className={styles.inlineNewsletterSubscribe} label="+"/> */}
                </h4>
              </div>
              <div className="column">
                <div className={styles.spaceFloat}>
                  <Image
                    src={DP}
                    width={400}
                    height={325}
                    alt="Photo of Meher Howji"
                    placeholder="empty"
                    priority={true}
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.scrollIndicator} container`}>
              {/* don't show scroll indicator on large screen where the bottom sections are visible */}
              {/* <ScrollIndicator /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
