import React from 'react'
import { useRouter } from 'next/router'
import TransactionHistoryTemplate from '@/components/templates/transaction'
import { useGetWithdrawHistories } from '@/services/transaction/query'
import PageHead from '@/components/templates/seo/PageHead'

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
      <PageHead />
      <TransactionHistoryTemplate
        activeTab="withdraw"
        data={data}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  )
}
