import React from 'react'
import Head from 'next/head'
import WritingBookLayout from '@/components/layouts/writing/WritingBook'
import WritingChapterForm from '@/components/organisms/forms/WritingChapters'
import { APP_NAME } from '@/utils/constants'
import {
  useGetMyBookChapterFromId,
  useGetMyBookFromId,
} from '@/services/my-book/query'
import { useRouter } from 'next/router'

const UpdateChapterPage = () => {
  const { query } = useRouter()
  const { data: detailBook } = useGetMyBookFromId(
    String(query?.bookId),
    query?.bookId !== undefined
  )
  const { data: chapterDetail } = useGetMyBookChapterFromId(
    {
      chapterId: String(query?.chapterId ?? ''),
      bookId: String(query?.bookId ?? ''),
    },
    !!query?.chapterId && !!query?.bookId
  )

  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Update Bab`}</title>
      </Head>
      <WritingBookLayout headerMode="create">
        <WritingChapterForm
          cover={detailBook?.cover ?? ''}
          chapter={chapterDetail}
        />
      </WritingBookLayout>
    </>
  )
}

export default UpdateChapterPage
