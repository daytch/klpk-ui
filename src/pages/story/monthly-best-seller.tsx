import React from 'react'
import { useGetBestSellerBooks } from '@/services/book/query'
import ListingBookTemplate from '@/components/templates/book/ListingBookTemplate'
import PageHead from '@/components/templates/seo/PageHead'

export default function MonthlyBestSellerPage() {
  const { data: books, isLoading } = useGetBestSellerBooks('monthly', true, 20)

  return (
    <>
      <PageHead />
      <ListingBookTemplate
        books={books ?? []}
        title="Monthly Best Sellers"
        isLoading={isLoading}
      />
    </>
  )
}
