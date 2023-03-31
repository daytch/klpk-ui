import React, { Fragment } from 'react'
import Head from 'next/head'
import { dehydrate, DehydratedState } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useGetDetailPublicBookById } from '@/services/book/query'
import { queryClient } from '@/utils/react-query'
import { APP_NAME } from '@/utils/constants'
import ProfileBookTemplate from '@/components/templates/book/ProfileBookTemplate'
import Spinner from '@/components/molecules/Spinner'
import { getMyBookFromId } from '@/services/my-book/api'

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
      getMyBookFromId(bookId as string)
    )
  } catch (error) {
    // console.log('error =>', error)
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

  return (
    <Fragment>
      <Head>
        <title>{`${APP_NAME} | Profil Buku`}</title>
        <link
          rel="preload"
          href="/assets/images/dummy/dummy-hero-profile-book.jpg"
          as="image"
        />
      </Head>
      <ProfileBookTemplate book={data} onRefetchData={refetch} />
    </Fragment>
  )
}
