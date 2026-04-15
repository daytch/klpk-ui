import React, { Fragment } from 'react'
import { dehydrate, DehydratedState } from '@tanstack/react-query'
import WriterProfileTemplate from '@/components/templates/writer-profile'
import { GetServerSideProps } from 'next'
import { getWriterProfile } from '@/services/profile/api'
import { useGetWriterProfile } from '@/services/profile/query'
import { queryClient } from '@/utils/react-query'
import PageHead from '@/components/templates/seo/PageHead'
import { serverApiService } from '@/utils/serverHttpRequest'
import { ProfileUserDataModel } from '@/interfaces/profile'

type WriterProfilePageProps = {
  dehydratedState?: DehydratedState
  writerId?: string
  seoTitle?: string
  seoDescription?: string
  seoImage?: string
}

export const getServerSideProps: GetServerSideProps<
  WriterProfilePageProps
> = async (ctx) => {
  let notFound = false
  const writerId = ctx.query.writerId?.toString()
  let seoTitle = 'KLPK APP'
  let seoDescription = ''
  let seoImage = ''

  try {
    const res = await serverApiService.get<ProfileUserDataModel>(`/profiles/${writerId}`)
    const profile = res.data
    seoTitle = profile?.fullName ? `${profile.fullName} — KLPK` : 'KLPK APP'
    seoDescription = profile?.bio ?? ''
    seoImage = profile?.photos?.[0]?.url ?? ''
  } catch (error) {
    notFound = true
  }

  // Fetch untuk hydration client-side (boleh gagal, tidak affect SEO)
  try {
    await queryClient.fetchQuery(['get-writer-profile', writerId], () =>
      getWriterProfile(writerId as string)
    )
  } catch (_) {}

  if (notFound) {
    return { notFound: true }
  }

  return {
    props: { writerId, dehydratedState: dehydrate(queryClient), seoTitle, seoDescription, seoImage },
  }
}

export default function WriterProfilePage({
  writerId,
  seoTitle,
  seoDescription,
  seoImage,
}: WriterProfilePageProps) {
  const { data, refetch } = useGetWriterProfile(writerId as string)

  const url = `https://komunitaspatrickkellan.com/profile/penulis/${writerId}`

  return (
    <Fragment>
      <PageHead
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        url={url}
        deepLinkPath={`profile/penulis/${writerId}`}
      />
      <WriterProfileTemplate profile={data ?? null} onRefetchData={refetch} />
    </Fragment>
  )
}
