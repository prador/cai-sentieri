// pages/api/revalidate.ts
// Called by WordPress via webhook when content is saved/updated.
// Configure WordPress to POST to: https://your-domain.com/api/revalidate?secret=YOUR_SECRET
//
// Payload format:
//   { "type": "trail", "slug": "trail-slug" }
//   { "type": "post", "slug": "post-slug" }
//   { "type": "all" }

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const { type, slug } = req.body as { type?: string; slug?: string }

  try {
    if (type === 'trail' && slug) {
      await res.revalidate(`/trails/${slug}`)
      await res.revalidate('/sentieri')
      await res.revalidate('/sentieri-aumentati')
    } else if (type === 'post' && slug) {
      await res.revalidate(`/posts/${slug}`)
      await res.revalidate('/posts')
    } else if (type === 'all') {
      await res.revalidate('/sentieri')
      await res.revalidate('/sentieri-aumentati')
      await res.revalidate('/posts')
    } else {
      return res.status(400).json({ message: 'Missing or invalid type/slug in body' })
    }

    return res.json({ revalidated: true, type, slug })
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating', error: (err as Error).message })
  }
}
