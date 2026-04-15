import React, { Fragment } from 'react'
import { dehydrate, DehydratedState } from '@tanstack/react-query'
import WriterProfileTemplate from '@/components/templates/writer-profile'
import { GetServerSideProps } from 'next'
import { getWriterProfile } from '@/services/profile/api'
import { useGetWriterProfile } from '@/services/profile/query'
import { queryClient } from '@/utils/react-query'
import PageHead from '@/components/templates/seo/PageHead'

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

  const title = data?.fullName ? `${data.fullName} — KLPK` : 'KLPK APP'
  const description = data?.bio ?? undefined
  const image = data?.photos?.[0]?.url ?? undefined
  const url = `https://komunitaspatrickkellan.com/profile/penulis/${writerId}`

  return (
    <Fragment>
      <PageHead
        title={title}
        description={description}
        image={image}
        url={url}
        deepLinkPath={`profile/penulis/${writerId}`}
      />
      <WriterProfileTemplate profile={data ?? null} onRefetchData={refetch} />
    </Fragment>
  )
}
