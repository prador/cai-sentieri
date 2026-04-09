import { getTrail } from 'lib/service'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Trail } from 'types'
import { useStore } from 'store/dataStore'
import Carousel from 'components/carousel'
import Image from 'next/image'

const TrailContent = ({ slug }: { slug: string }) => {
  const [trail, setTrail] = useState<Trail | undefined>()
  const {pageLang, setPageLang} = useStore()
  // const pageLang = 'it'
  useEffect(() => {
    async function fetchTrail() {
      const trailx = await getTrail(slug)
      setTrail(trailx)
      console.log(trailx)
    }
    fetchTrail()
    
  }, [])
  return (
    <>
    {trail?.trailSubdescription && (
                  <div
                    className="md:mx-4 mb-4 text-xl md:text-2xl leading-relaxed text-forest-green-700"
                    dangerouslySetInnerHTML={{ __html: `${pageLang === "it" ? `${trail?.trailSubdescription}` : `${trail?.translation.trailSubdescription}`}` }}
                  />
                )}
                
                {trail?.trailDescription && (
                  <div
                    className="md:mx-4 mb-6 leading-relaxed whitespace-pre-wrap text-black md:columns-2"
                    dangerouslySetInnerHTML={{ __html: `${pageLang === "it" ? `${trail?.trailDescription}` : `${trail?.translation.trailDescription}`}` }}
                  />
                )}

                {trail?.imageLinkTitle && (
                  <Link target="_blank" rel="noreferrer" href={trail?.imageLinkUrl}>
                    <div className="w-full h-48 mb-8 relative flex items-center justify-center">
                      <Image
                        src={trail?.imageLinkImage?.node?.mediaItemUrl}
                        fill
                        alt={trail?.imageLinkTitle}
                        className="object-cover rounded-md"
                      />
                      <span className="absolute z-10 bg-white px-5 py-2 text-lg">{trail?.imageLinkTitle}</span>
                    </div>
                  </Link>
                )}

                {trail?.galleryImages.nodes.length > 0 && (
                  <div className="mt-8">
                    <Carousel slideUrls={trail?.galleryImages.nodes} />
                    <div className="mt-4 text-gray-500">
                      Fonte immagini{' '}
                      <Link className="text-blue-500 font-bold underline" href="https://www.provincia.alessandria.it/sentieri/">
                        Provincia di Alessandria
                      </Link>{' '}
                      & Archivio Fotografico CAI Tortona{' '}
                    </div>
                  </div>
                )}
    </>
  )
}

export default TrailContent
