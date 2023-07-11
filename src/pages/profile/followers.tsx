import React from 'react'
import ProfileLayout from '@/components/layouts/profile'
import FollowerTemplate from '@/components/templates/profile/FollowerTemplate'
import { useGetMe } from '@/services/profile/query'
import PageHead from '@/components/templates/seo/PageHead'

export default function ProfileFollowersPage() {
  const { data } = useGetMe()

  return (
    <>
      <PageHead />
      <ProfileLayout profile={data}>
        <FollowerTemplate userId={data?.id} />
      </ProfileLayout>
    </>
  )
}
