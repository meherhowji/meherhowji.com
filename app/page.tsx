"use client";
// import { Subscribe, ArticlesPreview, Hero, Footer, Courses, Head, ViewCounter } from "@/components";
import Hero from "@/app/components/hero";
import { useInView } from "react-intersection-observer";
// import { NextSeo } from "next-seo";
// import { allPosts } from "contentlayer/generated";
// import cn from "classnames";
// import sal from "sal.js";
// import "sal.js/dist/sal.css";

export default function Home() {
  const { ref, inView: courseInView } = useInView({
    threshold: 0,
  });
  return (
    <div className="mainContainer">
      <main className={"toggleMenu"} {...handlers}>
        <MobileNav toggleMenu={toggleMenu} />
        <DesktopNav onMobileNavToggle={toggleMobileNav} onFooter={false} />
        {/* <Hero courseInView={courseInView} /> */}
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
