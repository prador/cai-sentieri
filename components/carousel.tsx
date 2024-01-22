import * as React from 'react'
import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from 'keen-slider/react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
// import 'yet-another-react-lightbox/plugins/caption.css'
import Image from 'next/image'
import NextJsImage from './nextjsimage'

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
  const [index, setIndex] = React.useState(-1)
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
  
  const srcArray = slideArray.map(item => ({ src: item.mediaItemUrl , title: item.altText}))
  console.log(srcArray)
  const slides = slideArray?.map(item => item.mediaItemUrl)
  console.log(slides)
  const settings = {
    columnCount: {
      default: 8,
      mobile: 3,
      tab: 4,
    },
    mode: 'dark',
  }

  return (
    <>
      <Lightbox
        index={index}
        open={open}
        close={() => setOpen(false)}
        slides={srcArray}
        render={{ slide: NextJsImage, thumbnail: NextJsImage }}
        plugins={[Thumbnails,Captions]}
      />
      {/* <div ref={sliderRef} className="keen-slider">
        {slides.map(slide => {
    return (<div className="keen-slider__slide h-48 object-contain relative"> <Image src={slide} fill alt='sdf' style={{objectFit:"contain"}}/> </div>)})}
      </div> */}

      <div className="w-full overflow-x-scroll ">
        <div ref={thumbnailRef} className="flex w-[300vw] md:w-[100vw] gap-2">
        {srcArray.map((slide, i: number) => {
            console.log(slide)
            return (
              <div key={i} className="flex relative w-32 h-32">
                <Image
                  data-index={i}
                  data-src={slide.src}
                  onClick={() => {
                    setIndex(i)
                    setOpen(true)
                  }}
                  src={slide.src}
                  fill
                  alt={slide.title}
                  className="rounded-md flex flex-grow object-cover w-full"
                />
              </div>
            )
          })}
          
        </div>
      </div>
    </>
  )
}
