import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { NotificationDataModel } from '@/interfaces/notification'
import Image from 'next/image'
import Link from '@/components/atoms/Link'
import NotificationCard from '../cards/NotificationCard'
import IconArrow from '@/components/icons/IconArrow'
import NoDataCard from '../cards/NoDataCard'

interface NotificationDropdownProps {
  notifications: NotificationDataModel[]
  unReadMessage: number
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  unReadMessage,
}) => {
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
            src="/assets/icons/icon-notification.svg"
            width={24}
            height={24}
            alt=""
          />

          {unReadMessage !== 0 && (
            <span className="inline-block w-[6px] h-[6px] bg-[#FF3535] rounded-full absolute z-[2] top-[5px] right-1 ring-1 ring-white" />
          )}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={-3}
            className="max-w-[350px] w-[100vw] bg-dark-200 rounded-lg z-10 p-4"
          >
            <p className="text-xl font-bold text-gold-200 mb-3">Notifikasi</p>
            {notifications.length === 0 && (
              <NoDataCard text="Tidak ada pesan" />
            )}
            <div className="max-h-[50vh] scrollbar overflow-y-auto">
              {notifications.length > 0 &&
                notifications.map((notification, index) => (
                  <NotificationCard
                    key={index}
                    notification={notification}
                    hideReadButton
                  />
                ))}
            </div>

            {notifications.length > 0 && (
              <div className="flex justify-center mt-4">
                <Link
                  to="/notification"
                  className="inline-flex items-center space-x-1 py-[6px] px-3 border border-gold-100 text-xs leading-3 font-gotham text-gold-100 rounded-[50px] font-thin"
                >
                  <span>Lihat Semua</span>
                  <IconArrow />
                </Link>
              </div>
            )}

            <DropdownMenu.Arrow className="DropdownMenuArrow fill-dark-200 w-[14px] h-[7px]" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}

export default NotificationDropdown
