import { joinClass } from '@/utils/common'
import Image from 'next/image'
import React from 'react'

type ProfileUserCardProps = {
  image: string
  name: string
  isActive?: boolean
  onActiveActionClick: () => void
  onInactiveActionClick: () => void
}

export default function ProfileUserCard({
  image,
  name,
  isActive,
  onActiveActionClick,
  onInactiveActionClick,
}: ProfileUserCardProps) {
  const handleClickButton = () => {
    if (isActive) {
      onActiveActionClick()
    } else {
      onInactiveActionClick()
    }
  }
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-6 text-kplkWhite">
        <Image
          src={image}
          alt=""
          width={55}
          height={55}
          className="rounded-full"
        />
        <p className="text-sm font-gotham font-medium leading-3">{name}</p>
      </div>
      <button
        onClick={handleClickButton}
        type="button"
        className={joinClass(
          'inline-block text-center rounded-lg py-[5px] min-w-[152px] max-w-[160px] text-xs leading-5',
          isActive ? 'bg-gold-300 text-white' : 'bg-[#0A84FF] text-white'
        )}
      >
        {isActive ? 'Following' : 'Follow'}
      </button>
    </div>
  )
}
