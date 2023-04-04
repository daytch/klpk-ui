import WritingHomepageTemplate from '@/components/templates/writing/WritingHomepage'
import { useGetInfiniteMyBook } from '@/services/my-book/query'
import { APP_NAME } from '@/utils/constants'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const WritingPage = () => {
  const { query } = useRouter()
  const { data, hasNextPage, fetchNextPage, isLoading } = useGetInfiniteMyBook({
    pageParam: 1,
    params: { limit: 10, status: (query?.writingTab as string) ?? undefined },
  })

  useEffect(() => {
    if (!document) return
    document.body.classList.add('writing-page')
  }, [])
  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Menulis`}</title>
      </Head>
      <WritingHomepageTemplate
        bookPages={data}
        isLoadingBook={isLoading}
        hasNextBookPage={hasNextPage}
        onGetNextPage={fetchNextPage}
      />
    </>
  )
}

export default WritingPage
