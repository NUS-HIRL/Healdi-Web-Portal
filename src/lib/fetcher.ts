const fetcher = async (path: string) => {
  const isLocalApi = path.startsWith('/api/')
  const url = isLocalApi && typeof window !== 'undefined' ? `${window.location.origin}${path}` : path
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Request failed: ${res.status}`)
  }
  return res.json()
}

export default fetcher
