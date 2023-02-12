import React from 'react'
import Head from 'next/head'
import TransactionHistoryTemplate from '@/components/templates/transaction'

const TransactionHistoryPage = () => {
  return (
    <>
      <Head>
        <title>Riwayat Transaksi | KLPK</title>
      </Head>
      <TransactionHistoryTemplate />
    </>
  )
}

export default TransactionHistoryPage
