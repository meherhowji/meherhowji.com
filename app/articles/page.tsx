import type { Metadata } from 'next';
import { getBlogPosts } from '@/db/read-markdown-files';
import PageTitle from '@/components/page-title';
import PageContainer from '@/app/page-container';
import styles from '@/styles/component-css/hero.module.scss';
import TutorialList from '@/components/tutorial-list';

interface Post {
  draft: string; // Assuming draft is a JSON-encoded string, e.g., '{"draft":true}' or '{"draft":false}'
  [key: string]: any; // Other properties can be dynamic
}

export const metadata: Metadata = {
  title: 'Articles',
};

export default function Articles() {
  let posts = getBlogPosts();
  return (
    <PageContainer>
      <section className={`${styles.page} ${styles.nonLandingScreen}`}>
        <PageTitle preTitle={`${posts.length} POSTS`} title="Articles" />
        {/* TODO: start fixing here, the pagetitle was styled well, not tutoriallist needs to be styled*/}
        <TutorialList postList={posts.filter(finalDraft)} />
        {/* <ViewCounter
        slug={'articles-page'}
        trackView={true}
        show={false}
        isPage={true}
      /> */}
      </section>
    </PageContainer>
  );
}

function finalDraft(post: Post): boolean {
  if (process.env.NODE_ENV === 'development') {
    return true; // Assuming you want to use every post in development
  } else {
    return post && !JSON.parse(post.draft).draft; // Adjust based on the actual structure of `draft`
  }
}
