import ContactForm from "./contactForm"
import { useEffect, useState } from 'react'
import { getSiteSettings } from 'lib/service'

const Footer = () => {
  const [siteSettings, setSiteSettings] = useState(null)

  useEffect(() => {
    getSiteSettings().then(setSiteSettings)
  }, [])

  return (
    <div className="bg-gray-200 p-8">
      <div className="container md:last:flex justify-between">

          <div
              className="border py-4 leading-relaxed text-forest-green-700"
              dangerouslySetInnerHTML={{ __html: `${siteSettings?.footerInfo}` }}
            />
        <div><ContactForm /></div>

      </div>
    </div>
  )
}

export default Footer
