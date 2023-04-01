import React from 'react'
import Image from 'next/image'
import { TopWriterDataModel } from '@/interfaces/writer'
import GravatarIcon from '@/assets/icons/gravatar.svg'
import Link from '@/components/atoms/Link'

interface ITopWriterCardProps {
  writer: TopWriterDataModel
}

const TopWriterCard: React.FC<ITopWriterCardProps> = ({ writer }) => {
  const { fullName, bio, photos } = writer
  const avatar = photos.find((photo) => photo.type === 'avatar')?.url

  return (
    <Link to={`/profile/penulis/${writer?.userId ?? ''}`} className="block w-full h-full px-6 pt-10 pb-14 bg-dark-300 rounded-[20px] overflow-hidden">
      <Image
        className="block mx-auto rounded-full mb-7 w-[90px] h-[90px] object-cover"
        alt=""
        width={90}
        height={90}
        src={avatar ? avatar : GravatarIcon}
      />

      <div className="py-2 text-center">
        <h3 className="capitalize text-kplkWhite font-gotham font-bold text-sm leading-3 mb-2">
          {fullName}
        </h3>
        <p className="text-gold-400 font-light text-xs leading-3 mb-4">
          Penulis
        </p>
        <p className="text-gold-400 font-light text-xs leading-3 line-clamp-3">
          "{bio}"
        </p>
      </div>
    </Link>
  )
}

export default TopWriterCard
