import React from 'react'
import { useGetInfiniteBooks } from '@/services/book/query'
import InfiniteListingBookTemplate from '@/components/templates/book/InfiniteListingBookTemplate'
import PageHead from '@/components/templates/seo/PageHead'

export default function RecommendedStoryPage() {
  const { data, isLoading, hasNextPage, fetchNextPage } = useGetInfiniteBooks({
    params: { recommended: true, limit: 20 },
  })

  return (
    <>
      <PageHead />
      <InfiniteListingBookTemplate
        pagesBook={data}
        title="Recommended Story"
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        onFetchNextPage={fetchNextPage}
      />
    </>
  )
}
