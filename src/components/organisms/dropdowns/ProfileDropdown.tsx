import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import NoImage from '@/assets/icons/no-avatar.svg'
import Link from '@/components/atoms/Link'
import IconUser from '@/components/icons/IconUser'
import IconBrush from '@/components/icons/IconBrush'
import IconLogout from '@/components/icons/IconLogout'
import { useAuth } from '@/store/useAuth'
import { useGetMe } from '@/services/profile/query'

type ProfileDropdownProps = {
  onCloseSignalIR: () => void
}

export default function ProfileDropdown({
  onCloseSignalIR,
}: ProfileDropdownProps) {
  const { logout } = useAuth()
  const { data } = useGetMe()

  const profilePicture = data?.photos?.find((photo) => photo?.type === 'avatar')

  const handleLogout = async () => {
    const Router = (await import('next/router')).default
    logout()
    onCloseSignalIR()
    Router.push('/')
  }

  return (
    <div className="relative inline-block text-left">
      <DropdownMenu.Root
        onOpenChange={() => {
          if (typeof window !== undefined) {
            document.body.classList.add('dropdown-open')
          }
        }}
      >
        <DropdownMenu.Trigger className="inline-flex outline-none relative">
          <Image
            src={profilePicture?.url ?? NoImage}
            width={35}
            height={35}
            alt=""
            className="rounded-full"
          />
          <div className="w-2 h-2 bg-[#5CCC5A] rounded-full absolute z-[2] top-0 right-0" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={-3}
            className="min-w-[164px] bg-dark-200 rounded-lg z-10"
          >
            <DropdownMenu.Item>
              <Link
                className="flex items-center border-b border-gold-100 w-[164px] py-2 px-4 text-white space-x-2 cursor-pointer outline-none"
                to="/profile"
              >
                <IconUser color="#D6B16D" />
                <span>Profil</span>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link
                to="/menulis"
                className="flex items-center border-b border-gold-100 w-[164px] py-2 px-4 text-white space-x-2 cursor-pointer outline-none"
              >
                <IconBrush color="#D6B16D" />
                <span>Menulis</span>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link
                to="/bacaan-saya"
                className="flex items-center border-b border-gold-100 w-[164px] py-2 px-4 text-white space-x-2 cursor-pointer outline-none"
              >
                <IconBrush color="#D6B16D" />
                <span>Bacaan Saya</span>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <button
                onClick={handleLogout}
                className="flex items-center border-b border-gold-100 w-[164px] py-2 px-4 text-white space-x-2 cursor-pointer outline-none"
              >
                <IconLogout color="#D6B16D" />
                <span>Keluar</span>
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Arrow className="DropdownMenuArrow fill-dark-200 w-[14px] h-[7px]" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
