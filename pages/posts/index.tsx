// pages/posts/index.tsx
import React from 'react'
import { GetStaticProps } from 'next'

import { getPosts } from '../../lib/service'

export default function HomePage({ posts }: { posts: any }) {
  return (
    <div className="container mt-12 mx-auto py-8">
      <h3 className="text-xl">All my posts ({posts.length})</h3>
      <div className="my-6 flex flex-col">
        {posts.map((post: any) => {
          return (
            <div className="text-black mb-5">
              <p>{post.title}</p>
              <p>{post.slug}</p>
              <p>{post.content}</p>
              {/* <p>{post.trailInfo.trail}</p> */}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const posts = await getPosts(100) // retrieve first 100 posts
    return {
      props: { posts: posts || [] },
      revalidate: 86400, // 24h fallback — on-demand revalidation via /api/revalidate handles updates
    }
  } catch (e) {
    console.warn('Could not fetch posts:', e)
    return { props: { posts: [] }, revalidate: 86400 }
  }
}
