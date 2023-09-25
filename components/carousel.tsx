import * as React from 'react'
import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from 'keen-slider/react'
import Lightroom from 'react-lightbox-gallery'
import Lightbox from 'yet-another-react-lightbox'
import Inline from 'yet-another-react-lightbox/plugins/inline'
import Image from 'next/image'

function ThumbnailPlugin(mainRef: React.MutableRefObject<KeenSliderInstance | null>): KeenSliderPlugin {
  return slider => {
    function removeActive() {
      slider.slides.forEach(slide => {
        slide.classList.remove('active')
      })
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add('active')
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on('created', () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on('animationStarted', main => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

export default function Carousel(slideUrls: any) {
  const [open, setOpen] = React.useState(false)
  const [index, setIndex] = React.useState(0)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
  })
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)],
  )
  const slideArray = slideUrls?.slideUrls
  const srcArray = slideArray.map(item => ({ src: item.mediaItemUrl }))
  const slides = slideArray?.map(item => item.mediaItemUrl)
  const settings = {
    columnCount: {
      default: 5,
      mobile: 3,
      tab: 4,
    },
    mode: 'dark',
  }

  return (
    <>
      {/* <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={srcArray}
            />
    <Lightroom images={srcArray} settings={settings} /> */}
      {/* <div ref={sliderRef} className="keen-slider">
        {slides.map(slide => {
    return (<div className="keen-slider__slide h-48 object-contain relative"> <Image src={slide} fill alt='sdf' style={{objectFit:"contain"}}/> </div>)})}
      </div> */}

      <div ref={thumbnailRef} className="keen-slider thumbnail">
        {slides.map(slide => {
          return (
            <div className="keen-slider__slide  w-full h-12">
              {' '}
              <Image src={slide} fill alt="sdf" style={{ objectFit: 'contain' }} />{' '}
            </div>
          )
        })}
      </div>
    </>
  )
}
