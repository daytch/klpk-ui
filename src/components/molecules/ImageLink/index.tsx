import Link from '@/components/atoms/Link'
import Image from 'next/image'
import React from 'react'

interface ImageLinkProps {
  image: string
  alt: string
  to: string
}

const ImageLink: React.FC<ImageLinkProps> = ({ image, to, alt }) => {
  return (
    <Link to={to} className="relative w-full h-full">
      <Image src={image} alt={alt} fill />
    </Link>
  )
}

export default ImageLink
