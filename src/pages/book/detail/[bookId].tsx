import React, { Fragment } from 'react'
import { dehydrate, DehydratedState } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useGetDetailPublicBookById } from '@/services/book/query'
import { queryClient } from '@/utils/react-query'
import ProfileBookTemplate from '@/components/templates/book/ProfileBookTemplate'
import Spinner from '@/components/molecules/Spinner'
import { getPublicBookById } from '@/services/my-book/api'
import PageHead from '@/components/templates/seo/PageHead'

type WriterProfilePageProps = {
  dehydratedState?: DehydratedState
  bookId?: string
}

export const getServerSideProps: GetServerSideProps<
  WriterProfilePageProps
> = async (ctx) => {
  let notFound = false
  const bookId = ctx.query.bookId?.toString()

  try {
    await queryClient.fetchQuery(['get-detail-public-book', bookId], () =>
      getPublicBookById(bookId as string)
    )
  } catch (error) {
    notFound = true
  }

  if (notFound) {
    return {
      notFound: true,
    }
  }

  return {
    props: { bookId, dehydratedState: dehydrate(queryClient) },
  }
}

export default function ProfileBookPage({ bookId }: { bookId: string }) {
  const { data, isLoading, refetch } = useGetDetailPublicBookById(bookId)

  if (isLoading) return <Spinner />

  const title = data?.title ? `${data.title} — KLPK` : 'KLPK APP'
  const description = data?.synopsis ?? undefined
  const image = data?.cover ?? undefined
  const url = `https://komunitaspatrickkellan.com/book/detail/${bookId}`

  return (
    <Fragment>
      <PageHead
        title={title}
        description={description}
        image={image}
        url={url}
        deepLinkPath={`book/detail/${bookId}`}
      />
      <ProfileBookTemplate book={data as any} onRefetchData={refetch} />
    </Fragment>
  )
}
