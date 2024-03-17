'use client'
// import { Subscribe, ArticlesPreview, Hero, Footer, Courses, Head, ViewCounter } from "@/components";
import { useEffect } from "react";
// import { useInView } from "react-intersection-observer";
// import { NextSeo } from "next-seo";
// import { allPosts } from "contentlayer/generated";
// import cn from "classnames";
// import sal from "sal.js";
// import "sal.js/dist/sal.css";

export default function Home() {
  // need to add scroll listener
  // const { ref, inView: courseInView } = useInView({
  //   threshold: 0,
  // });

  // useEffect(() => {
  //   var salInstance = sal();
  //   salInstance.disable();
  // }, []);

  return (
    <div className="mainContainer">
      {/* <Head title="Meher Howji" />
      <NextSeo canonical={`https://meherhowji.com`} /> */}
      <main className={"toggleMenu"}>
        {/* <Hero courseInView={courseInView} />
        <Courses ref={ref} />
        <ArticlesPreview allPosts={allPosts.slice(0, 3)} />
        <Subscribe /> */}
        {/* <Pricing /> */}
        {/* <Team /> */}
      </main>
      {/* <Footer />
      <ViewCounter slug={"landing-page"} trackView show={false} isPage /> */}
    </div>
  );
}
