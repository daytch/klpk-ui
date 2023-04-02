import React from 'react'
import Head from 'next/head'
import TransactionHistoryTemplate from '@/components/templates/transaction'
import { APP_NAME } from '@/utils/constants'
import { useGetTransactionHistories } from '@/services/transaction/query'
import { useRouter } from 'next/router'

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
      <Head>
        <title>{`${APP_NAME} | Riwayat Transaksi`}</title>
      </Head>
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
