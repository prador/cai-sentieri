// lib/service.ts
import { fetchAPI } from './base'

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
export async function getHomeLinkCards() {
  const data = await fetchAPI(
    `query HomeLinkCards {
      page(id: "home", idType: URI) {
        linkCards {
          linkCard1 {
            linkCardTitle
            linkCardDescription
            linkCardLink {
              url
              title
              target
            }
            linkCardImageUrl
          }
          linkCard2 {
            linkCardTitle
            linkCardDescription
            linkCardLink {
              url
              title
              target
            }
            linkCardImageUrl
          }
          linkCard3 {
            linkCardTitle
            linkCardDescription
            linkCardLink {
              url
              title
              target
            }
            linkCardImageUrl
          }
        }
      }
    }`
  )

   const acf = data?.page?.linkCards
  if (!acf) return []

  // Flatten image out of the node wrapper before returning
  return [acf.linkCard1, acf.linkCard2, acf.linkCard3].map(card => ({
    linkCardTitle: card?.linkCardTitle ?? null,
    linkCardDescription: card?.linkCardDescription ?? null,
    linkCardLink: card?.linkCardLink ?? null,
    linkCardImageUrl: card?.linkCardImageUrl ?? null,  // ← flattened
    linkCardImageAlt: card?.linkCardImage?.node?.title ?? null,       // ← flattened
  }))
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
          valcurone
          valleossona
          valgrue
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