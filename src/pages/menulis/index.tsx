import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import PageHead from '@/components/templates/seo/PageHead'
import WritingHomepageTemplate from '@/components/templates/writing/WritingHomepage'
import { useGetInfiniteMyBook } from '@/services/my-book/query'

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
      <PageHead />
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
