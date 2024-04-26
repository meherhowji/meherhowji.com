"use client";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Hero from "@/app/components/hero";
import DesktopNav from "@/app/components/desktop-nav";
import MobileNav from "@/app/components/mobile-nav";

// import { useInView } from "react-intersection-observer";
// import { Subscribe, ArticlesPreview, Hero, Footer, Courses, Head, ViewCounter } from "@/components";
// import { NextSeo } from "next-seo";
// import { allPosts } from "contentlayer/generated";
// import cn from "classnames";
// import sal from "sal.js";
// import "sal.js/dist/sal.css";

export default function Home() {
  const [toggleMobileMenu, setToggleMenu] = useState(false);
  const [compLoaded, setCompLoaded] = useState(true);

  function toggleMobileNav() {
    setToggleMenu(!toggleMobileMenu);
    compLoaded && setCompLoaded(false);
    // setTimeout(() => {
    // document.querySelector('body').classList.toggle('overflowHidden')
    // }, 500) // duration same as $anim-duration in layout.scss
  }

  const handlers = useSwipeable({
    onSwipedUp: () => (toggleMobileMenu ? toggleMobileNav() : undefined),
  });

  return (
    <div className="mainContainer">
      <MobileNav showOnToggle={toggleMobileMenu} />
      <main
        className={`pageContainer ${toggleMobileMenu ? "slideDownOnMobile showOnMobile" : ""}`}
        {...handlers}
        style={{ height: "100vh" }}
      >
        <DesktopNav onMobileNavToggle={toggleMobileNav} onFooter={false} />
        <Hero />
        {/* <Courses ref={ref} /> */}
        {/* <ArticlesPreview allPosts={allPosts.slice(0, 3)} /> */}
        {/* <Subscribe /> */}
        {/* <Pricing /> */}
        {/* <Team /> */}
      </main>
      {/* <Footer />
      <ViewCounter slug={"landing-page"} trackView show={false} isPage /> */}
    </div>
  );
}
