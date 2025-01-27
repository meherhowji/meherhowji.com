{
  /* 
	TODO: start working here,
	it seems the articles list page is working well, not sure how well on mobile device etc.
	However, to start working on the new script of the YT,
	this page is going to be important.
   */
}

export default async function Page(props: Params) {
  const params = await props.params
  return <div>My Post: {params.slug}</div>
}

type Params = {
  params: Promise<{
    slug: string
  }>
}

// Sources:
// https://github.com/vercel/next.js/blob/canary/examples/blog-starter/src/app/posts/%5Bslug%5D/page.tsx
