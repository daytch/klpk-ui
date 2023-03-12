import React from 'react'
import Image from 'next/image'
import { joinClass } from '@/utils/common'

type ImageTextProps = {
  type?: 'default' | 'synopsis'
  text: string
  description?: string
  icon: string
  color?: 'white' | 'gold'
}

export default function ImageText({
  text,
  icon,
  description,
  type = 'default',
  color = 'white',
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
      <Image
        style={{
          filter: color === 'white' ? 'none' : 'brightness(0.5)',
        }}
        src={icon}
        width={16}
        height={16}
        alt={text}
      />
      <p
        className={joinClass(
          'text-xs font-extralight font-gotham',
          color === 'white' ? 'text-kplkWhite' : 'text-gold-200'
        )}
      >
        {text}
      </p>
    </div>
  )
}
