async function fetcher(url) {
  const res = await fetch(url)
  return res.json()
}

async function updater(url, { arg }) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  })
  return res.json()
}

const swrOptions = {
  revalidateOnFocus: true,
  revalidateIfStale: true,
}

export { fetcher, updater, swrOptions }
