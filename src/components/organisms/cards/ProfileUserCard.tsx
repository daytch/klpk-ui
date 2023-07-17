import React, { useMemo } from 'react'
import Image from 'next/image'
import { joinClass } from '@/utils/common'
import { ProfilePhotoDataModel } from '@/interfaces/profile'
import Link from '@/components/atoms/Link'
import NoImage from '@/assets/icons/no-avatar.svg'

type ProfileUserCardProps = {
  id: string
  profilePhoto?: ProfilePhotoDataModel[]
  name: string
  isActive?: boolean
  onActiveActionClick?: () => void
  onInactiveActionClick?: () => void
}

export default function ProfileUserCard({
  id,
  profilePhoto,
  name,
  isActive,
  onActiveActionClick = () => {},
  onInactiveActionClick = () => {},
}: ProfileUserCardProps) {
  const userAvatarImage = useMemo(() => {
    const cover = profilePhoto?.find((photo) => photo.type === 'avatar')
    return cover?.url ?? NoImage
  }, [profilePhoto])

  const handleClickButton = () => {
    if (isActive) {
      onActiveActionClick()
    } else {
      onInactiveActionClick()
    }
  }
  return (
    <div className="flex items-center justify-between space-x-4">
      <Link to={`/profile/penulis/${id}`} className="block">
        <div className="flex items-center space-x-6 text-kplkWhite">
          <Image
            src={userAvatarImage}
            alt={name}
            width={55}
            height={55}
            className="w-[55px] h-[55px] rounded-full object-cover"
          />
          <p className="text-sm font-gotham font-medium leading-3">{name}</p>
        </div>
      </Link>
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
