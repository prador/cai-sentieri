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
  const posts = await getPosts(100)
  const paths = posts.map(post => ({ params: { slug: post.slug } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const posts = await getPosts(100) // retrieve first 100 posts
  const post = posts.find(x => x.slug === context.params.slug)

  return {
    props: {
      post: post || null,
    },
    revalidate: 3600,
  }
}
