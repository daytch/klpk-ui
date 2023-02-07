import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import WritingBookLayout from '@/components/layouts/writing/WritingBook'
import { APP_NAME } from '@/utils/constants'
import { useGetMyBookFromId } from '@/services/my-book/query'
import WritingBookTemplate from '@/components/templates/writing/WritingBook'

const UpdateBookPage = () => {
  const { query } = useRouter()
  const { data: detailBook } = useGetMyBookFromId(
    String(query?.bookId ?? ''),
    query.bookId !== undefined
  )

  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Menulis`}</title>
      </Head>
      <WritingBookLayout>
        <WritingBookTemplate detailBook={detailBook} />
      </WritingBookLayout>
    </>
  )
}

export default UpdateBookPage
