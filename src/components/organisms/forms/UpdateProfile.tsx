import { ProfileUserDataModel } from '@/interfaces/profile'
import React from 'react'
import UpdateUnverifiedProfile from './UpdateUnverifiedProfile'
import UpdateVerifiedProfile from './UpdateVerifiedProfile'

type UpdateProfileFormProps = {
  onSuccessUpdateProfile?: () => void
  profile?: ProfileUserDataModel
}

export default function UpdateProfileForm({
  onSuccessUpdateProfile = () => {},
  profile,
}: UpdateProfileFormProps) {
  return profile?.verified ? (
    <UpdateVerifiedProfile
      profile={profile}
      onSuccessUpdateProfile={onSuccessUpdateProfile}
    />
  ) : (
    <UpdateUnverifiedProfile
      profile={profile}
      onSuccessUpdateProfile={onSuccessUpdateProfile}
    />
  )
}
