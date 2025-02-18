import type { Metadata } from 'next'
import { getBlogPosts } from '@/db/read-markdown-files'
import PageTitle from '@/components/page-title'
import PageLayout from '@/app/page-layout'
import styles from '@/components/component-css/hero.module.scss'
import TutorialList from '@/components/tutorial-list'

interface Post {
  draft: string // Assuming draft is a JSON-encoded string, e.g., '{"draft":true}' or '{"draft":false}'
  [key: string]: any // Other properties can be dynamic
}

export const metadata: Metadata = {
  title: 'Articles',
}

export default async function Articles() {
  let posts = await getBlogPosts()

  return (
    <PageLayout>
      <section className={`${styles.page} ${styles.nonLandingScreen}`}>
        <PageTitle preTitle={`${posts.length} POSTS`} title="Articles" />
        <TutorialList postList={posts} />
        {/* <ViewCounter
        slug={'articles-page'}
        trackView={true}
        show={false}
        isPage={true}
      /> */}
      </section>
    </PageLayout>
  )
}

// TODO: plug this so that the drafts can be viewed in dev mode
function finalDraft(post: Post): boolean {
  if (process.env.NODE_ENV === 'development') {
    return true // Assuming you want to use every post in development
  } else {
    return post && !JSON.parse(post.draft).draft // Adjust based on the actual structure of `draft`
  }
}
