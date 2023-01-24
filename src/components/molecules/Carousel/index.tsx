import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import IconChevron from '@/components/icons/IconChevron'
import { joinClass } from '@/utils/common'

interface ICarouselProps {
  hasNavigation?: boolean
  hasDots?: boolean
  items: any[]
  options?: EmblaOptionsType
  children: React.ReactNode
  className?: string
}

const Carousel: React.FC<ICarouselProps> = ({
  hasDots = false,
  hasNavigation = false,
  items,
  options,
  children,
  className,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, setScrollSnaps, onSelect])

  if (!items.length) return null
  return (
    <div className={joinClass('relative', className ?? '')}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row h-auto -mr-6">{children}</div>
      </div>
      {hasNavigation && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-10 inline-flex items-center justify-center bg-transparent rounded-full border border-white md:border-gold-300 w-[26px] h-[26px] z-[5]"
            disabled={!prevBtnEnabled}
          >
            <IconChevron />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-10 inline-flex items-center justify-center bg-transparent rounded-full border border-white md:border-gold-300 w-[26px] h-[26px] z-[5]"
            disabled={!nextBtnEnabled}
          >
            <IconChevron className="rotate-180" />
          </button>
        </>
      )}
      {hasDots && (
        <div className="flex space-x-3 mt-3 justify-center">
          {scrollSnaps.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => scrollTo(index)}
              className={joinClass(
                'w-[10px] h-[10px] rounded-full',
                index === selectedIndex ? 'bg-gold-100' : 'bg-dark-500'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel
