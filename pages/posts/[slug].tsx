// pages/posts/[slug].tsx
import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { getPosts } from '../../lib/service'
import { Post } from 'types'

export default function PostPage({ post }: { post: Post }) {
  return (
    <div className="container mt-12 mx-auto py-8">
      <div className="my-6 flex flex-col">
        <div className="text-black mb-5">
          <h1 className="text-xl font-bold">{post.title}</h1>
          <div className="text-base leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const posts = await getPosts(100)
    const paths = posts.map(post => ({ params: { slug: post.slug } }))
    return { paths, fallback: 'blocking' }
  } catch (e) {
    console.warn('Could not fetch posts for static paths:', e)
    return { paths: [], fallback: 'blocking' }
  }
}

export const getStaticProps: GetStaticProps = async context => {
  try {
    const posts = await getPosts(100)
    const post = posts.find(x => x.slug === context.params.slug)
    return {
      props: { post: post || null },
      revalidate: 86400, // 24h fallback — on-demand revalidation via /api/revalidate handles updates
    }
  } catch (e) {
    console.warn('Could not fetch post data:', e)
    return { notFound: true }
  }
}
