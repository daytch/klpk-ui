import Carousel from '@/components/molecules/Carousel'
import TestimonyCard from '@/components/molecules/TestimonyCard'
import { TopWriterDataModel } from '@/interfaces/writer'
import React from 'react'

interface TestimonySliderProps {
  topWriters: TopWriterDataModel[]
}

const TopWriterSlider: React.FC<TestimonySliderProps> = ({ topWriters }) => {
  if (!topWriters.length) return null
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div className="">
          <h2 className="flex items-center space-x-2 mb-2 font-gotham font-bold text-gold-200 text-2xl leading-5 capitalize">
            <span>Writers of the Month</span>
          </h2>
          <p className="text-sm font-light leading-3 capitalize text-gold-100">
            10 Penulis dengan Pendapatan Terbesar
          </p>
        </div>
      </div>
      <Carousel
        hasNavigation
        items={topWriters}
        options={{
          containScroll: 'trimSnaps',
          align: 'start',
          slidesToScroll: 'auto',
        }}
      >
        {topWriters.map((writer, index) => (
          <div
            key={index}
            className="grow-0 shrink-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pr-12"
          >
            <TestimonyCard writer={writer} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default TopWriterSlider
