import React from 'react'
import { useGetInfiniteBooks } from '@/services/book/query'
import InfiniteListingBookTemplate from '@/components/templates/book/InfiniteListingBookTemplate'
import PageHead from '@/components/templates/seo/PageHead'

export default function ShortStoryPage() {
  const { data, isLoading, hasNextPage, fetchNextPage } = useGetInfiniteBooks({
    params: { shortStory: true, limit: 20 },
  })

  return (
    <>
      <PageHead />
      <InfiniteListingBookTemplate
        pagesBook={data}
        title="Short Story"
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        onFetchNextPage={fetchNextPage}
      />
    </>
  )
}
