import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import Link from '@/components/atoms/Link'
import CointCard from '../cards/CointCard'
import { useGetMe } from '@/services/profile/query'

export default function WalletDropdown() {
  const { data } = useGetMe()

  return (
    <div className="relative inline-block text-left">
      <DropdownMenu.Root
        onOpenChange={() => {
          if (typeof window !== undefined) {
            document.body.classList.add('dropdown-open')
          }
        }}
      >
        <DropdownMenu.Trigger className="inline-flex items-center justify-center px-4 font-sfpro font-normal min-h-[20px] rounded-lg text-base bg-gold-200 text-dark-300 hover:bg-gold-200/95 focus:ring-2 focus:ring-gold-200 hover:text-dark-300/95 disabled:bg-gold-300 disabled:cursor-not-allowed w-full py-2 space-x-2">
          <Image
            src="/assets/icons/icon-wallet.svg"
            width={24}
            height={24}
            alt=""
          />
          <span>Wallet</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={-3}
            className="min-w-[164px] bg-dark-200 rounded-lg z-10 outline-none border-none ring-0"
          >
            <DropdownMenu.Item>
              <div className="overflow-hidden rounded-lg w-64 ">
                <div className="w-full bg-dark-200 p-5 flex items-center">
                  <CointCard amount={data?.coinBalance ?? 0} />
                </div>
                <Link
                  className="p-[10px] text-center w-full block bg-gold-200 text-dark-200"
                  to="/transaksi/transaksi"
                >
                  Detail
                </Link>
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Arrow className="DropdownMenuArrow fill-dark-200 w-[14px] h-[7px]" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
