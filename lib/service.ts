import { fetchAPI } from './base'

// export async function getTrails() {
//   const url = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/trail`;
//   const headers = { 'Content-Type': 'application/json' }

//   const res = await fetch(url)

//   const json = await res.json()
//   console.error(json)
//   if (json.errors) {
//     console.error(json.errors)
//     throw new Error('Failed to fetch API')
//   }
//   return json.data
// }
// export async function getTrails() {
//   const url = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/trail`;
//       const response = await fetch(url);
//       // Check if the response status is OK (status code 200)
//       if (response.ok) {
//         const data = await response.json();
//         // Process and use the fetched data here
//         console.log(data);
//       } else {
//         console.error(`Request failed with status: ${response.status}`);
//       }
//     return response.json();
// }
export async function getTrails(first = 1) {
  const data = await fetchAPI(
    `query WpTrails {
      trails (first: 500) {
        nodes {
          title(format: RENDERED)
          uri
          slug
          trailLocation(format: RENDERED)
          trailNumber(format: RENDERED)
          trailId
          trailCategory(format: RENDERED)
          trailTimeNeeded
          trailSubdescription(format: RENDERED)
          trailDescription(format: RENDERED)
          trailDifficulty(format: RENDERED)
          trailMapGprxFile {
            node {
              mediaItemUrl
            }
          }
          galleryImages {
            nodes {
              mediaItemUrl
            }
          }
          imageLinkImage {
            node {
              mediaItemUrl
            }
          }
          imageLinkTitle(format: RENDERED)
          imageLinkUrl(format: RENDERED)
        }
      }
    }`,
    {
      variables: {
        first,
      },
    },
  )

  return data?.trails?.nodes
}
export async function getPosts(first = 1) {
  const data = await fetchAPI(
    `query WpPosts {
        posts {
          nodes {
            content
            date
            slug
            title
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
