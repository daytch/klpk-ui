import React from 'react'
import Image from 'next/image'

type ImageTextProps = {
  type?: 'default' | 'synopsis'
  text: string
  description?: string
  icon: string
}

export default function ImageText({
  text,
  icon,
  description,
  type = 'default',
}: ImageTextProps) {
  if (type === 'synopsis') {
    return (
      <div className="inline-flex items-center space-x-[10px] font-light">
        <Image src={icon} width={24} height={24} alt={text} />
        <div className="font-gotham text-xs">
          <p className="text-gold-300 mb-[2px]">{text}</p>
          <p className="text-gold-200">{description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center space-x-2">
      <Image src={icon} width={16} height={16} alt={text} />
      <p className="text-kplkWhite text-xs font-extralight font-gotham">
        {text}
      </p>
    </div>
  )
}
