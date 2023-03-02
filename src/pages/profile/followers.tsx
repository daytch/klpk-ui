import React from 'react'
import Head from 'next/head'
import ProfileLayout from '@/components/layouts/profile'
import { APP_NAME } from '@/utils/constants'
import ProfileListTemplate from '@/components/templates/profile/ProfileList'
import { useGetMe } from '@/services/profile/query'

export default function ProfileFollowersPage() {
  const { data } = useGetMe()

  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Mengikuti`}</title>
      </Head>
      <ProfileLayout profile={data}>
        <ProfileListTemplate userId={data?.id} />
      </ProfileLayout>
    </>
  )
}
