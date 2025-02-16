import { TutorialList, Footer, HeroBanner, PageTitle } from '@/components'

export default function SlugListPage({ postDetails }) {
  console.log('🚀 ~ SlugListPage ~ postDetails:', postDetails)
  return (
    <div className="mainContainer">
      <main className="heroContainer">
        <PageTitle title={postDetails[0].frontmatter.tags} />
        {/* <HeroBanner title={} /> */}
        {/* <TutorialList postList={postDetails} /> */}
      </main>
      <Footer />
    </div>
  )
}

// <Head title={`${'test'} | Meher Howji`}/>
// export const metadata: Metadata = {
//   title: '',
//   description: 'The official Next.js Course Dashboard, built with App Router.',
//   metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
// };
