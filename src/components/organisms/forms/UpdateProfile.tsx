import React from 'react'
import UpdateUnverifiedProfile from './UpdateUnverifiedProfile'
import UpdateVerifiedProfile from './UpdateVerifiedProfile'

type UpdateProfileFormProps = {
  onSuccessUpdateProfile: () => void
  isVerifiedUser?: boolean
}

export default function UpdateProfileForm({
  onSuccessUpdateProfile,
  isVerifiedUser,
}: UpdateProfileFormProps) {
  return isVerifiedUser ? (
    <UpdateVerifiedProfile onSuccessUpdateProfile={onSuccessUpdateProfile} />
  ) : (
    <UpdateUnverifiedProfile onSuccessUpdateProfile={onSuccessUpdateProfile} />
  )
}
