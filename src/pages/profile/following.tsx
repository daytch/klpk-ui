import React from 'react'
import ProfileLayout from '@/components/layouts/profile'
import { useGetMe } from '@/services/profile/query'
import FollowingTemplate from '@/components/templates/profile/FollowingTemplate'
import PageHead from '@/components/templates/seo/PageHead'

export default function ProfileFollowPage() {
  const { data } = useGetMe()

  return (
    <>
      <PageHead />
      <ProfileLayout profile={data}>
        <FollowingTemplate userId={data?.id} />
      </ProfileLayout>
    </>
  )
}
