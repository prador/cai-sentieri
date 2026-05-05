// lib/service.ts
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
export async function getTrails(first) {
  const data = await fetchAPI(
    `query WpTrails($language: LanguageCodeEnum!) {
      trails (first: 500) {
        nodes {
          translation(language:$language) {
            id,
            content,
            title(format: RENDERED)
          uri
          slug
          trailLocation(format: RENDERED)
          trailNumber(format: RENDERED)
          trailCategory(format: RENDERED)
          trailTimeNeeded
          trailSubdescription(format: RENDERED)
          trailDescription(format: RENDERED)
          trailDifficulty(format: RENDERED)
            language {
              locale
              slug
            }
          }
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
              altText
              title
            }
          }
          imageLinkImage {
            node {
              mediaItemUrl
            }
          }
          itinerioName
          relatedTrails {
            nodes {
              title(format: RENDERED)
              uri
              slug
              trailLocation(format: RENDERED)
            trailNumber(format: RENDERED)
            trailCategory(format: RENDERED)
            trailTimeNeeded
            trailSubdescription(format: RENDERED)
            trailDescription(format: RENDERED)
            trailDifficulty(format: RENDERED)
            }
          }
          imageLinkTitle(format: RENDERED)
          imageLinkUrl(format: RENDERED)
          pathColor
          pathPoint {
            nodes {
              pointLat
              pointName
              pointLng
              pointDescription
              pointImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }`,
    {
      variables: {
        first,
        language:"IT" // if translations are added, change this to EN
      },
    },
  )

  return data?.trails?.nodes
}

export async function getTrail(id: string) {
  const data = await fetchAPI(
    `query WpTrail($id: ID = "") {
      trail(id: $id, idType: SLUG) {
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
              title
            }
          }
          imageLinkImage {
            node {
              mediaItemUrl
            }
          }
          itinerioName
          relatedTrails {
            nodes {
              title(format: RENDERED)
              uri
              slug
              trailLocation(format: RENDERED)
            trailNumber(format: RENDERED)
            trailCategory(format: RENDERED)
            trailTimeNeeded
            trailSubdescription(format: RENDERED)
            trailDescription(format: RENDERED)
            trailDifficulty(format: RENDERED)
            }
          }
          imageLinkTitle(format: RENDERED)
          imageLinkUrl(format: RENDERED)
          pathColor
          pathPoint {
            nodes {
              pointLat
              pointName
              pointLng
              pointDescription
              pointImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
      }
    }`,
    {
      variables: {
        id,
      },
    },
  )

  return data?.trail
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

export async function getSiteSettings() {
  const data = await fetchAPI(
    `query SiteSettings {
        siteSettings {
          siteTitle
          siteDescription
          footerInfo
          logoDesktop
          logoMobile
          logoFavicon
        }
    }`
  )

  return data?.siteSettings
}

export async function getAllPageSlugs() {
  const data = await fetchAPI(
    `query {
      pages(first: 100) {
        nodes {
          slug
        }
      }
    }`
  )
  return data?.pages?.nodes?.map((p: { slug: string }) => ({ slug: p.slug })) ?? []
}

export async function getPageBySlug(slug: string) {
  const data = await fetchAPI(
    `query GetPage($id: ID = "") {
      page(id: $id, idType: URI) {
        title
        content
      }
    }`,
    {
      variables: { id: slug },
    }
  )
  return data?.page
}

export async function getNavMenu() {
  const data = await fetchAPI(
    `query GetMenu {
      menus(where: { location: MAIN_MENU }) {
        nodes {
          menuItems {
            nodes {
              id
              label
              url
              parentId
              childItems {
                nodes {
                  id
                  label
                  url
                }
              }
            }
          }
        }
      }
    }`,
    {
      variables: {
        location: "Main_Menu",
      },
    },
  )

  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL ?? ''
  const items = data?.menus?.nodes?.[0]?.menuItems?.nodes ?? []

  // filter out child items from top level (they appear under parentId)
  const topLevel = items.filter((item: any) => !item.parentId)

  return topLevel.map((item: any) => ({
    title: item.label,
    href: item.url.replace(WP_URL, '') || '/',
  }))
}