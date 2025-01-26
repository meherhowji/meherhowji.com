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
