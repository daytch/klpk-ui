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
      autoPlay
    >
      {banners.map((banner, index) => (
        <div
          key={index}
          className="h-[400px] shrink-0 grow-0 basis-full rounded-lg overflow-hidden aspect-[4/1] aspect-4-1"
        >
          <Image
            loading="eager"
            src={banner}
            alt=""
            width={950}
            height={400}
            className="w-full h-full object-fill"
          />
        </div>
      ))}
    </Carousel>
  )
}

export default BannerSlider
