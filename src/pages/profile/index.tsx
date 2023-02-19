import React, { useState } from 'react'
import Head from 'next/head'
import ProfileLayout from '@/components/layouts/profile'
import { APP_NAME } from '@/utils/constants'
import UpdateProfileForm from '@/components/organisms/forms/UpdateProfile'
import { useGetMe } from '@/services/profile/query'

export default function ProfileIndexPage() {
  const { data } = useGetMe()
  const [setIsVerified] = useState(false)
  return (
    <>
      <Head>
        <title>Profile User | {APP_NAME}</title>
      </Head>
      <ProfileLayout profile={data}>
        <UpdateProfileForm
          profile={data}
          onSuccessUpdateProfile={() => setIsVerified(true)}
        />
      </ProfileLayout>
    </>
  )
}
