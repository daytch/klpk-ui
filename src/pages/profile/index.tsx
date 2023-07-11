import React from 'react'
import ProfileLayout from '@/components/layouts/profile'
import UpdateProfileForm from '@/components/organisms/forms/UpdateProfile'
import { useGetMe } from '@/services/profile/query'
import PageHead from '@/components/templates/seo/PageHead'

export default function ProfileIndexPage() {
  const { data } = useGetMe()

  return (
    <>
      <PageHead />
      <ProfileLayout profile={data}>
        <UpdateProfileForm profile={data} />
      </ProfileLayout>
    </>
  )
}
