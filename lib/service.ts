import { fetchAPI } from './base'

export async function getPosts(first = 1) {
  const data = await fetchAPI(
    `query WpPosts {
        posts {
          nodes {
            content
            date
            slug
            title
            test {
              testtext
            }
          }
        }
      }`,
    {
      variables: {
        first,
      },
    },
  )

  return data?.posts?.nodes
}

export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(
    `query GetPost($id: ID = "") {
    post(id: $id, idType: SLUG) {
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      slug
      title
    }
  }`,
    {
      variables: {
        id: slug,
      },
    },
  )

  return data?.post
}
