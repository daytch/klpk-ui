import React, { Fragment } from 'react'
import { dehydrate, DehydratedState } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useGetDetailPublicBookById } from '@/services/book/query'
import { queryClient } from '@/utils/react-query'
import ProfileBookTemplate from '@/components/templates/book/ProfileBookTemplate'
import Spinner from '@/components/molecules/Spinner'
import { getPublicBookById } from '@/services/my-book/api'
import PageHead from '@/components/templates/seo/PageHead'
import { serverApiService } from '@/utils/serverHttpRequest'
import { DetailBookDataModel } from '@/interfaces/book'

type WriterProfilePageProps = {
  dehydratedState?: DehydratedState
  bookId?: string
  seoTitle?: string
  seoDescription?: string
  seoImage?: string
}

export const getServerSideProps: GetServerSideProps<
  WriterProfilePageProps
> = async (ctx) => {
  let notFound = false
  const bookId = ctx.query.bookId?.toString()
  let seoTitle = 'KLPK APP'
  let seoDescription = ''
  let seoImage = ''

  try {
    const res = await serverApiService.get<DetailBookDataModel>(`/public-books/${bookId}`)
    const book = res.data
    seoTitle = book?.title ? `${book.title} — KLPK` : 'KLPK APP'
    seoDescription = book?.synopsis ?? ''
    seoImage = book?.cover ?? ''
  } catch (error) {
    notFound = true
  }

  // Fetch untuk hydration client-side (boleh gagal, tidak affect SEO)
  try {
    await queryClient.fetchQuery(['get-detail-public-book', bookId], () =>
      getPublicBookById(bookId as string)
    )
  } catch (_) {}

  if (notFound) {
    return { notFound: true }
  }

  return {
    props: { bookId, dehydratedState: dehydrate(queryClient), seoTitle, seoDescription, seoImage },
  }
}

export default function ProfileBookPage({ bookId, seoTitle, seoDescription, seoImage }: WriterProfilePageProps) {
  const { data, isLoading, refetch } = useGetDetailPublicBookById(bookId!)

  if (isLoading) return <Spinner />

  const url = `https://komunitaspatrickkellan.com/book/detail/${bookId}`

  return (
    <Fragment>
      <PageHead
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        url={url}
        deepLinkPath={`book/detail/${bookId}`}
      />
      <ProfileBookTemplate book={data as any} onRefetchData={refetch} />
    </Fragment>
  )
}
