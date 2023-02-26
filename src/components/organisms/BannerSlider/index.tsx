import React from 'react'
import Carousel from '@/components/molecules/Carousel'
import Image from 'next/image'

interface IBannerSliderProps {
  banners: string[]
}

const BannerSlider: React.FC<IBannerSliderProps> = ({ banners }) => {
  if (!banners.length) return null
  return (
    <Carousel
      options={{
        align: 'start',
      }}
      hasDots
      items={banners}
    >
      {banners.map((banner, index) => (
        <div
          key={index}
          className="shrink-0 grow-0 basis-full rounded-lg overflow-hidden"
        >
          <Image
            loading="eager"
            src={banner}
            alt=""
            width={959}
            height={224}
            className="w-full"
          />
        </div>
      ))}
    </Carousel>
  )
}

export default BannerSlider
