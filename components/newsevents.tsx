import { getPosts } from 'lib/service'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Post } from 'types'

const NewsEvents = () => {
  const [posts, setPosts] = useState<Post[] | undefined>()

  useEffect(() => {
    async function fetchPosts() {
      const postsx = await getPosts(100)
      setPosts(postsx)
    }
    fetchPosts()
  }, [])

  return (
    <div className="container mx-auto p-8 bg-gray-100 ">
      <h3 className="text-xl">News & Events</h3>
      <div className="my-6 flex flex-col">
        {posts?.map((post: any, index: number) => {
          return (
            <Link href={`/posts/${post.slug}`} className="text-black mb-5" key={index}>
              <h4 className="text-xl font-bold">{post.title}</h4>
              <div className="text-base leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: post.content }} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default NewsEvents
