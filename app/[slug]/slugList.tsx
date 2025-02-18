import { Metadata } from 'next'
import { TutorialList, PageTitle } from '@/components'
import PageLayout from '@/app/page-layout'
import styles from '@/components/component-css/hero.module.scss'
import { MDXPost } from '@/db/markdown.d'

export const metadata: Metadata = {
  title: 'Articles',
}

export default function SlugListPage({ posts }: { posts: MDXPost[] }) {
  return (
    <PageLayout>
      <section className={`${styles.page} ${styles.nonLandingScreen}`}>
        <PageTitle title={posts[0].frontmatter.tags} />
        <TutorialList postList={posts} />
      </section>
    </PageLayout>
  )
}
