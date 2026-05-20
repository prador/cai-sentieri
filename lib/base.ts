// lib/base.ts
const API_URL = <string>process.env.NEXT_PUBLIC_WORDPRESS_GRAPHAPI_URL

export async function fetchAPI(query = '', { variables }: Record<string, any> = {}, attempt = 0): Promise<any> {
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  }

  try {
    const res = await fetch(API_URL, {
      headers,
      method: 'POST',
      body: JSON.stringify({ query, variables }),
      signal: AbortSignal.timeout(30000),
    })

    const json = await res.json()

    if (json.errors) {
      console.error(json.errors)
    }
    return json.data
  } catch (err: any) {
    if (attempt >= 2) throw err // max 3 attempts (0, 1, 2)
    const delay = 2000 * (attempt + 1) // 2s, 4s
    console.warn(`fetchAPI attempt ${attempt + 1} failed (${err.message}), retrying in ${delay}ms…`)
    await new Promise<void>(resolve => { setTimeout(resolve, delay) })
    return fetchAPI(query, { variables }, attempt + 1)
  }
}