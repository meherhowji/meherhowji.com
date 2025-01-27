export default async function Page(props: Params) {
  const params = await props.params
  return <div>Courses</div>
}

type Params = {
  params: Promise<{
    slug: string
  }>
}
