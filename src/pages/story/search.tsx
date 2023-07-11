import React from 'react'
import { useRouter } from 'next/router'
import { useGetInfiniteBooks } from '@/services/book/query'
import SearchBookTemplate from '@/components/templates/book/SearchBookTemplate'
import PageHead from '@/components/templates/seo/PageHead'

export default function StorySearchBookPage() {
  const router = useRouter()
  const { search, category, completed } = router.query
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useGetInfiniteBooks({
      params: {
        search: String(search || ''),
        category: String(category || ''),
        completed: completed === 'true' ? true : undefined,
      },
    })

  return (
    <>
      <PageHead />
      <SearchBookTemplate
        pagesBook={data}
        isLoading={isLoading}
        isError={isError}
        hasNextPage={hasNextPage}
        onFetchNextPage={fetchNextPage}
      />
    </>
  )
}
