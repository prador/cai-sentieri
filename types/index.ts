type geoJson = {
  type: string
  features?: Array<
    | {
        type?: string
        properties: {
          id?: any
          icon?: any
          name?: string
          links?: Array<{ href: string }>
          pointDescription?: string
          pointImage?: any
          pointImgUrl?: string
        }
        geometry: {
          type?: string
          coordinates: Array<any>
        }
      }
    | undefined
  >
}

type Type = 'run' | 'swimrun'

export type Route = {
  title: string
  slug: string
  type: Type
  distance?: number
  elevation?: number
  geoJson?: geoJson
  rating?: number
  description?: string
  location?: string
  color: string
  date: string
  author?: {
    name: string
    url: string
  }
}

export type Routes = Array<Route>

export type FilesURI = {
  uri?: string,
  altText?: string
}

export type GalleryImages = {
  nodes?: FilesURI[]
}

export type ImageLinkImage = {
  node?: {
    mediaItemUrl?: string
  }
}
export type TrailGPXFile = {
  node?: {
    mediaItemUrl?: string
  }
}
export type Translation = {
  title?: string
  content?: string
  id?: string
  language?: {
    locale?: string
    slug?: string
  }
  uri?: string
  href?: string
  slug?: string
  pathColor?: string
  pathPoint?: any
  trailLocation?: string
  trailID?: number
  trailNumber?: string
  trailCategory?: string
  trailTimeNeeded?: number
  trailZoneSector?: string
  trailSubdescription?: string
  trailDescription?: string
  trailDifficulty?: string
}

export type Trail = {
  title?: string
  uri?: string
  href?: string
  slug?: string
  pathColor?: string
  pathPoint?: any
  trailLocation?: string
  trailID?: number
  trailNumber?: string
  trailCategory?: string
  trailTimeNeeded?: number
  trailZoneSector?: string
  trailSubdescription?: string
  trailDescription?: string
  trailDifficulty?: string
  trailMapGprxFile?: TrailGPXFile
  galleryImages?: GalleryImages
  imageLinkImage?: ImageLinkImage
  imageLinkTitle?: string
  imageLinkUrl?: string
  translation?: Translation
}

export type Post = {
  content?: string
  date?: string
  slug?: string
  title?: string
}

export type Trails = Array<Trail>
