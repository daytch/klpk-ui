import WritingHomepageTemplate from '@/components/templates/writing/WritingHomepage'
import { useGetInfiniteMyBook } from '@/services/my-book/query'
import { APP_NAME } from '@/utils/constants'
import Head from 'next/head'
import React, { useEffect } from 'react'

const WritingPage = () => {
  const { data, hasNextPage, fetchNextPage, isLoading } = useGetInfiniteMyBook({
    pageParam: 1,
    params: { limit: 10 },
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
