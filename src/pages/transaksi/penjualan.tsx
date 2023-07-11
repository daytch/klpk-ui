import React from 'react'
import { useRouter } from 'next/router'
import { useGetTransactionHistories } from '@/services/transaction/query'
import TransactionHistoryTemplate from '@/components/templates/transaction'
import PageHead from '@/components/templates/seo/PageHead'

export default function SaleHistoryPage() {
  const { query } = useRouter()
  const { data, isLoading, isError } = useGetTransactionHistories(
    {
      types: ['bookSales', 'chapterSales'],
      limit: 5,
      page: Number(query?.page ?? 1),
    },
    true
  )

  return (
    <>
      <PageHead />
      <TransactionHistoryTemplate
        activeTab="penjualan"
        data={data}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  )
}
