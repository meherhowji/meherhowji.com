import { Head, TutorialList, Footer, HeroBanner } from '@/components'

export default function PostList({ postDetails }) {
  return (
    <div className="mainContainer">
      <Head title="JavaScript Articles | Meher Howji" />
      <main className="heroContainer">
        <HeroBanner title={{ title: postDetails[0].tags[0] }} />
        <TutorialList postList={postDetails} />
      </main>
      <Footer />
    </div>
  )
}
