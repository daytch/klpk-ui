import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useGetTransactionHistories } from '@/services/transaction/query'
import TransactionHistoryTemplate from '@/components/templates/transaction'
import { APP_NAME } from '@/utils/constants'

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
      <Head>
        <title>{`${APP_NAME} | Riwayat Penjualan`}</title>
      </Head>
      <TransactionHistoryTemplate
        activeTab="penjualan"
        data={data}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  )
}
