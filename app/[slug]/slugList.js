import { TutorialList, Footer, HeroBanner, PageTitle } from '@/components'
import PageLayout from '@/app/page-layout'
import styles from '@/components/component-css/hero.module.scss'

export default function SlugListPage({ postDetails }) {
	console.log('🚀 ~ SlugListPage ~ postDetails:', postDetails)
	return (
		<PageLayout>
			<section className={`${styles.page} ${styles.nonLandingScreen}`}>
				<PageTitle title={postDetails[0].frontmatter.tags} />
				{/* <HeroBanner title={} /> */}
				{/* <TutorialList postList={postDetails} /> */}
			</section>
			</PageLayout>
	)
}

// <Head title={`${'test'} | Meher Howji`}/>
// export const metadata: Metadata = {
//   title: '',
//   description: 'The official Next.js Course Dashboard, built with App Router.',
//   metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
// };
