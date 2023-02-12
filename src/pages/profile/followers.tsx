import { APP_NAME } from '@/utils/constants'
import React from 'react'
import Head from 'next/head'
import ProfileLayout from '@/components/layouts/profile'
import ProfileListTemplate from '@/components/templates/profile/ProfileList'

export default function ProfileFollowersPage() {
  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Mengikuti`}</title>
      </Head>
      <ProfileLayout>
        <ProfileListTemplate />
      </ProfileLayout>
    </>
  )
}
