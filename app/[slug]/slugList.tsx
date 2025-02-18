import { Metadata } from 'next'
import { TutorialList, PageTitle } from '@/components'
import PageLayout from '@/app/page-layout'
import styles from '@/components/component-css/hero.module.scss'

export const metadata: Metadata = {
  title: 'Articles',
}

export default function SlugListPage({ postDetails }) {
  return (
    <PageLayout>
      <section className={`${styles.page} ${styles.nonLandingScreen}`}>
        <PageTitle title={postDetails[0].frontmatter.tags} />
        {/* <HeroBanner title={} /> */}
        <TutorialList postList={postDetails} />
      </section>
    </PageLayout>
  )
}
