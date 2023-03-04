import React from 'react'
import TransactionLayout from '@/components/layouts/transaction'
import NoDataCard from '@/components/organisms/cards/NoDataCard'

const TransactionHistoryTemplate = () => {
  return (
    <TransactionLayout>
      <NoDataCard text="Belum ada riwayat" />
    </TransactionLayout>
  )
}

export default TransactionHistoryTemplate
