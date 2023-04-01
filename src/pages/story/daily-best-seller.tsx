import React from 'react'
import Head from 'next/head'
import { useGetBestSellerBooks } from '@/services/book/query'
import ListingBookTemplate from '@/components/templates/book/ListingBookTemplate'
import { APP_NAME } from '@/utils/constants'

export default function DailyBestSellerPage() {
  const { data: books, isLoading } = useGetBestSellerBooks('daily', true, 20)

  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Daily Best Sellers`}</title>
      </Head>
      <ListingBookTemplate
        books={books ?? []}
        title="Daily Best Sellers"
        isLoading={isLoading}
      />
    </>
  )
}
