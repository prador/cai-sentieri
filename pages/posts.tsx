import { GetStaticProps } from 'next'

import { getPosts } from '../lib/service'

export default function HomePage({ posts }: { posts: any }) {
  return (
    <div className=" mx-auto py-8">
      <h3 className="text-xl">All my posts ({posts.length})</h3>
      <div className="my-6 flex flex-col">
        {posts.map((post: any) => {
          return (
            <div className="text-black mb-5">
              <p>{post.title}</p>
              <p>{post.slug}</p>
              <p>{post.content}</p>
              <p>{post.test.testtext}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts(100) // retrieve first 100 posts

  return {
    props: {
      posts,
    },
    revalidate: 3600,
  }
}
