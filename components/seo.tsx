import { DefaultSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import { getSiteSettings } from 'lib/service'

function SEO(siteSettings:any): JSX.Element {

console.log(siteSettings)
  const config = {
    title: siteSettings?.siteSettings?.siteTitle || 'CAI Tortona - Sentieri',
    description: siteSettings?.siteSettings?.siteDescription || 'I sentieri CAI del tortonese',
    openGraph: {
      type: 'website',
      locale: 'it_IT',
      url: 'https://sentieri.caitortona.net/',
      site_name: siteSettings?.siteSettings?.seoTitle || 'CAI Tortona - Sentieri',
      images: [
        {
          url: siteSettings?.logoDesktop,
          alt: siteSettings?.seoTitle || 'CAI Tortona - Sentieri',
        },
      ],
    },
  }

  return <DefaultSeo {...config} />
}

export default SEO