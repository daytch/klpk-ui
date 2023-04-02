import React from 'react'
import { useRouter } from 'next/router'
import { useGetInfiniteBooks } from '@/services/book/query'
import Head from 'next/head'
import { APP_NAME } from '@/utils/constants'
import SearchBookTemplate from '@/components/templates/book/SearchBookTemplate'

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
      <Head>
        <title>{`${APP_NAME} | Cari Buku`}</title>
      </Head>
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
