import Carousel from '@/components/molecules/Carousel'
import TestimonyCard from '@/components/molecules/TestimonyCard'
import { TestimonyDataModel } from '@/interfaces/book'
import React from 'react'

interface TestimonySliderProps {
  testimonies: TestimonyDataModel[]
}

const TestimonySlider: React.FC<TestimonySliderProps> = ({ testimonies }) => {
  if (!testimonies.length) return null
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
        items={testimonies}
        options={{
          containScroll: 'trimSnaps',
          align: 'start',
          slidesToScroll: 'auto',
        }}
      >
        {testimonies.map((testimony, index) => (
          <div
            key={index}
            className="grow-0 shrink-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pr-12"
          >
            <TestimonyCard testimony={testimony} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default TestimonySlider
