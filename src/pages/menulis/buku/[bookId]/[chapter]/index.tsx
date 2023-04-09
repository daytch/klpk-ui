import React from 'react'
import Head from 'next/head'
import WritingBookLayout from '@/components/layouts/writing/WritingBook'
import WritingChapterForm from '@/components/organisms/forms/WritingChapters'
import { APP_NAME } from '@/utils/constants'
import { useRouter } from 'next/router'
import { useGetMyBookFromId } from '@/services/my-book/query'

const ChapterListPage = () => {
  const { query } = useRouter()
  const { data: detailBook } = useGetMyBookFromId(
    String(query?.bookId),
    query?.bookId !== undefined
  )
  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Menulis`}</title>
      </Head>
      <WritingBookLayout headerMode="create">
        <WritingChapterForm detailBook={detailBook} />
      </WritingBookLayout>
    </>
  )
}

export default ChapterListPage
