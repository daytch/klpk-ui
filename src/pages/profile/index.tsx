import React, { useState } from 'react'
import Head from 'next/head'
import ProfileLayout from '@/components/layouts/profile'
import { APP_NAME } from '@/utils/constants'
import UpdateProfileForm from '@/components/organisms/forms/UpdateProfile'

export default function ProfileIndexPage() {
  const [isVerified, setIsVerified] = useState(false)
  return (
    <>
      <Head>
        <title>Profile User | {APP_NAME}</title>
      </Head>
      <ProfileLayout>
        <UpdateProfileForm
          isVerifiedUser={isVerified}
          onSuccessUpdateProfile={() => setIsVerified(true)}
        />
      </ProfileLayout>
    </>
  )
}
