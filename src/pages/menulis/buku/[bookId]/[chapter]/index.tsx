import React from 'react'
import { useRouter } from 'next/router'
import WritingBookLayout from '@/components/layouts/writing/WritingBook'
import WritingChapterForm from '@/components/organisms/forms/WritingChapters'
import { useGetMyBookFromId } from '@/services/my-book/query'
import PageHead from '@/components/templates/seo/PageHead'

const ChapterListPage = () => {
  const { query } = useRouter()
  const { data: detailBook } = useGetMyBookFromId(
    String(query?.bookId),
    query?.bookId !== undefined
  )
  return (
    <>
      <PageHead />
      <WritingBookLayout headerMode="create">
        <WritingChapterForm detailBook={detailBook} />
      </WritingBookLayout>
    </>
  )
}

export default ChapterListPage
