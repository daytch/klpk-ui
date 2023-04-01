import React from 'react'
import { APP_NAME } from '@/utils/constants'
import Head from 'next/head'
import { useGetBestSellerBooks } from '@/services/book/query'
import ListingBookTemplate from '@/components/templates/book/ListingBookTemplate'

export default function MonthlyBestSellerPage() {
  const { data: books, isLoading } = useGetBestSellerBooks('monthly', true, 20)
  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Monthly Best Sellers`}</title>
      </Head>
      <ListingBookTemplate
        books={books ?? []}
        title="Monthly Best Sellers"
        isLoading={isLoading}
      />
    </>
  )
}
