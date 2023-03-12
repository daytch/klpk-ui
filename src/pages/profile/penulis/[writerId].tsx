import React, { Fragment } from 'react'
import Head from 'next/head'
import { dehydrate, DehydratedState } from '@tanstack/react-query'
import { APP_NAME } from '@/utils/constants'
import WriterProfileTemplate from '@/components/templates/writer-profile'
import { GetServerSideProps } from 'next'
import { getWriterProfile } from '@/services/profile/api'
import { useGetWriterProfile } from '@/services/profile/query'
import { queryClient } from '@/utils/react-query'

type WriterProfilePageProps = {
  dehydratedState?: DehydratedState
  writerId?: string
}

export const getServerSideProps: GetServerSideProps<
  WriterProfilePageProps
> = async (ctx) => {
  let notFound = false
  const writerId = ctx.query.writerId?.toString()

  try {
    await queryClient.fetchQuery(['get-writer-profile', writerId], () =>
      getWriterProfile(writerId as string)
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
    props: { writerId, dehydratedState: dehydrate(queryClient) },
  }
}

export default function WriterProfilePage({
  writerId,
}: WriterProfilePageProps) {
  const { data, refetch } = useGetWriterProfile(writerId as string)
  return (
    <Fragment>
      <Head>
        <title>{`${APP_NAME} | Profil Buku`}</title>
      </Head>
      <WriterProfileTemplate profile={data ?? null} onRefetchData={refetch} />
    </Fragment>
  )
}
