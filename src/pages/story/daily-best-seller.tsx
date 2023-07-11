import React from 'react'
import { useGetBestSellerBooks } from '@/services/book/query'
import ListingBookTemplate from '@/components/templates/book/ListingBookTemplate'
import PageHead from '@/components/templates/seo/PageHead'

export default function DailyBestSellerPage() {
  const { data: books, isLoading } = useGetBestSellerBooks('daily', true, 20)

  return (
    <>
      <PageHead />
      <ListingBookTemplate
        books={books ?? []}
        title="Daily Best Sellers"
        isLoading={isLoading}
      />
    </>
  )
}
