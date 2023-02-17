import React from 'react'
import { formatNumberWithCommas } from '@/utils/common'
import Image from 'next/image'

type CointCardProps = {
  amount: number
}

export default function CointCard({ amount }: CointCardProps) {
  return (
    <div className="flex items-center space-x-4">
      <Image
        src="/assets/icons/icon-coint-02.png"
        alt=""
        width={44}
        height={44}
      />
      <p className="text-white font-normal text-2xl leading-6">
        {formatNumberWithCommas(amount)} Coins
      </p>
    </div>
  )
}
