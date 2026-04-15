import React from 'react'
import { useRouter } from 'next/router'
import SearchBookTemplate from '@/components/templates/search/SearchTemplate'
import PageHead from '@/components/templates/seo/PageHead'
import { useGetInfiniteAuthors } from '@/services/profile/query'

export default function AuthorsPage() {
  const router = useRouter()
  const { keyword } = router.query
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useGetInfiniteAuthors({
      params: {
        search: String(keyword || ''),
      },
    })

  return (
    <>
      <PageHead />
      <SearchBookTemplate
        activeTab='authors'
        data={data}
        isLoading={isLoading}
        isError={isError}
        hasNextPage={hasNextPage}
        onFetchNextPage={fetchNextPage}
      />
    </>
  )
}
