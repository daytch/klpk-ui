import React from 'react'
import { useRouter } from 'next/router'
import WritingBookLayout from '@/components/layouts/writing/WritingBook'
import { useGetMyBookFromId } from '@/services/my-book/query'
import WritingBookTemplate from '@/components/templates/writing/WritingBook'
import PageHead from '@/components/templates/seo/PageHead'

const UpdateBookPage = () => {
  const { query } = useRouter()
  const { data: detailBook } = useGetMyBookFromId(
    String(query?.bookId ?? ''),
    query.bookId !== undefined
  )

  return (
    <>
      <PageHead />
      <WritingBookLayout headerMode="create">
        <WritingBookTemplate detailBook={detailBook} />
      </WritingBookLayout>
    </>
  )
}

export default UpdateBookPage
