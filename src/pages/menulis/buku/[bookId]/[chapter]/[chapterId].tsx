import React from 'react'
import WritingBookLayout from '@/components/layouts/writing/WritingBook'
import WritingChapterForm from '@/components/organisms/forms/WritingChapters'
import {
  useGetMyBookChapterFromId,
  useGetMyBookFromId,
} from '@/services/my-book/query'
import { useRouter } from 'next/router'
import PageHead from '@/components/templates/seo/PageHead'

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
      <PageHead />
      <WritingBookLayout headerMode="create">
        <WritingChapterForm detailBook={detailBook} chapter={chapterDetail} />
      </WritingBookLayout>
    </>
  )
}

export default UpdateChapterPage
