import React from 'react'
import Head from 'next/head'
import ProfileLayout from '@/components/layouts/profile'
import { APP_NAME } from '@/utils/constants'
import FollowerTemplate from '@/components/templates/profile/FollowerTemplate'
import { useGetMe } from '@/services/profile/query'

export default function ProfileFollowersPage() {
  const { data } = useGetMe()

  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Mengikuti`}</title>
      </Head>
      <ProfileLayout profile={data}>
        <FollowerTemplate userId={data?.id} />
      </ProfileLayout>
    </>
  )
}
