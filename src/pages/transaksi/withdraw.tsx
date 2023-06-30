import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import TransactionHistoryTemplate from '@/components/templates/transaction'
import { APP_NAME } from '@/utils/constants'
import { useGetWithdrawHistories } from '@/services/transaction/query'

export default function WithdrawHistoryPage() {
  const { query } = useRouter()
  const { data, isLoading, isError } = useGetWithdrawHistories(
    {
      limit: 5,
      page: Number(query?.page ?? 1),
    },
    true
  )

  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Riwayat Withdraw`}</title>
      </Head>
      <TransactionHistoryTemplate
        activeTab="withdraw"
        data={data}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  )
}
