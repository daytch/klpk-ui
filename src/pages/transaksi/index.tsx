import React from 'react'
import TransactionHistoryTemplate from '@/components/templates/transaction'
import { useGetTransactionHistories } from '@/services/transaction/query'
import { useRouter } from 'next/router'
import PageHead from '@/components/templates/seo/PageHead'

const TransactionHistoryPage = () => {
  const { query } = useRouter()
  const { data, isLoading, isError } = useGetTransactionHistories(
    {
      types: ['topup', 'bookPurchase', 'chapterPurchase'],
      limit: 5,
      page: Number(query?.page ?? 1),
    },
    true
  )

  return (
    <>
      <PageHead />
      <TransactionHistoryTemplate
        activeTab="transaksi"
        data={data}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  )
}

export default TransactionHistoryPage
