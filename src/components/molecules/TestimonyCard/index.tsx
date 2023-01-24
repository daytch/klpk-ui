import { TestimonyDataModel } from '@/interfaces/book'
import Image from 'next/image'
import React from 'react'

interface ITestimonyCardProps {
  testimony: TestimonyDataModel
}

const TestimonyCard: React.FC<ITestimonyCardProps> = ({ testimony }) => {
  const { photo, name, description } = testimony

  return (
    <div className="w-full h-full px-6 pt-10 pb-14 bg-dark-300 rounded-[20px] overflow-hidden">
      <Image
        className="block mx-auto rounded-full mb-7"
        alt=""
        width={90}
        height={90}
        src={photo}
      />

      <div className="py-2 text-center">
        <h3 className="capitalize text-kplkWhite font-gotham font-bold text-sm leading-3 mb-2">
          {name}
        </h3>
        <p className="text-gold-400 font-light text-xs leading-3 mb-4">
          Penulis
        </p>
        <p className="text-gold-400 font-light text-xs leading-3 line-clamp-3">
          "{description}"
        </p>
      </div>
    </div>
  )
}

export default TestimonyCard
