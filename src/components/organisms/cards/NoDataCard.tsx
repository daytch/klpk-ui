import React from 'react'
import Image from 'next/image'

type NoDataCardProps = {
  text: string
}

export default function NoDataCard({ text }: NoDataCardProps) {
  return (
    <div className="px-4 pt-14 pb-10 flex flex-col items-center text-center">
      <Image
        alt="no history"
        src="/assets/images/no-histoory.png"
        width={163}
        height={120}
        className="mb-6"
      />
      <p className="font-gotham text-white text-base font-thin">{text}</p>
    </div>
  )
}
