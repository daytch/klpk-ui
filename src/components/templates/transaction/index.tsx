import TransactionLayout from '@/components/layouts/transaction'
import Image from 'next/image'
import React from 'react'

const TransactionHistoryTemplate = () => {
  return (
    <TransactionLayout>
      <div className="px-4 pt-14 pb-10 flex flex-col items-center text-center">
        <Image
          alt="no history"
          src="/assets/images/no-histoory.png"
          width={163}
          height={120}
          className="mb-6"
        />
        <p className="font-gotham text-white text-base font-thin">
          Belum ada riwayat
        </p>
      </div>
    </TransactionLayout>
  )
}

export default TransactionHistoryTemplate
