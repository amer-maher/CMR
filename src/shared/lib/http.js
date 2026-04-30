export async function getJson(url, { signal } = {}) {
  const res = await fetch(url, { signal })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Request failed (${res.status}) ${text}`.trim())
  }
  return res.json()
}

