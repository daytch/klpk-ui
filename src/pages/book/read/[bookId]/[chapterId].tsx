import React, { useState } from 'react'
import { dehydrate, DehydratedState } from '@tanstack/react-query'
import { APP_NAME } from '@/utils/constants'
import ReadBookTemplate from '@/components/templates/book/ReadBookTemplate'
import { queryClient } from '@/utils/react-query'
import { GetServerSideProps } from 'next'
import { getDetailPublicChapterById } from '@/services/book/api'
import {
  useGetDetailChapterById,
  useGetDetailPublicBookById,
} from '@/services/book/query'
import { getPublicBookById } from '@/services/my-book/api'
import NotFoundPage from '@/pages/404'

type ReadBookPageProps = {
  dehydratedState?: DehydratedState
  bookId?: string
  chapterId?: string
}

export const getServerSideProps: GetServerSideProps<ReadBookPageProps> = async (
  ctx
) => {
  const bookId = ctx.query.bookId?.toString() ?? ''
  const chapterId = ctx.query?.chapterId?.toString() ?? ''
  const params = { bookId, chapterId }

  await Promise.all([
    queryClient.prefetchQuery(['get-detail-public-book', bookId], () =>
      getPublicBookById(bookId as string)
    ),
    await queryClient.prefetchQuery(['get-detail-detail-chapter', params], () =>
      getDetailPublicChapterById(params)
    ),
  ])

  return {
    props: { chapterId, bookId, dehydratedState: dehydrate(queryClient) },
  }
}

export default function ReadBookPage({ chapterId, bookId }: ReadBookPageProps) {
  const [isForbidden, setIsForbidden] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)
  const { data: book, isLoading: isLoadingBook } = useGetDetailPublicBookById(
    bookId ?? ''
  )

  const {
    data: chapter,
    isLoading: isLoadingChapter,
    refetch: refetchChapter,
  } = useGetDetailChapterById(
    {
      bookId: bookId ?? '',
      chapterId: chapterId ?? '',
    },
    (err) => {
      if (err?.response?.status === 403) {
        setIsForbidden(true)
        setIsNotFound(false)
      }
      if (err?.response?.status === 401) {
        setIsForbidden(false)
        setIsNotFound(true)
      }
    }
  )

  if (isNotFound) return <NotFoundPage />

  return (
    <>
      <title>{`${APP_NAME} | Membaca Buku Buku`}</title>
      <ReadBookTemplate
        isLoading={isLoadingBook || isLoadingChapter}
        isForbidden={isForbidden}
        book={book as any}
        onSuccessPurchase={refetchChapter}
        chapter={chapter}
      />
    </>
  )
}
