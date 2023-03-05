import { APP_NAME } from '@/utils/constants'
import React from 'react'
import Head from 'next/head'
import ProfileLayout from '@/components/layouts/profile'
import { useGetMe } from '@/services/profile/query'
import FollowingTemplate from '@/components/templates/profile/FollowingTemplate'

export default function ProfileFollowPage() {
  const { data } = useGetMe()

  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Mengikuti`}</title>
      </Head>
      <ProfileLayout profile={data}>
        <FollowingTemplate userId={data?.id} />
      </ProfileLayout>
    </>
  )
}
