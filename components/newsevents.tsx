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
    <div className="container mx-auto py-4 px-4 bg-forest-green-50/20 rounded-lg border h-full">
      <h3 className="text-2xl text-forest-green-700">News & Events</h3>
      <div className="my-6 flex flex-col">
        {posts?.map((post: any, index: number) => {
          return (
            <Link href={`/posts/${post.slug}`} className="text-black mb-5" key={index}>
              <h4 className="text-lg font-bold">{post.title}</h4>
              <div className="text-sm leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: post.content }} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default NewsEvents
