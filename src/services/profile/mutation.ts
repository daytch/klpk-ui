import { useMutation } from '@tanstack/react-query'
import {
  UpdateProfilePayload,
  UserVeriticationPayload,
} from '@/interfaces/profile'
import {
  createVerificationUserRequest,
  followUser,
  unFollowUser,
  updateProfile,
  updateVerificationUserRequest,
  uploadUserAvatar,
  uploadUserCover,
} from './api'

export function useCreateVerificationUserRequest() {
  return useMutation({
    mutationKey: ['create-verification-user-request'],
    mutationFn: (body: UserVeriticationPayload) =>
      createVerificationUserRequest(body),
  })
}

export function useUpdateVerificationUserRequest() {
  return useMutation({
    mutationKey: ['update-verification-user-request'],
    mutationFn: ({ id, body }: { id: string; body: UserVeriticationPayload }) =>
      updateVerificationUserRequest(id, body),
  })
}

export function useUploadUserAvatar() {
  return useMutation({
    mutationKey: ['upload-user-avatar'],
    mutationFn: (body: FormData) => uploadUserAvatar(body),
  })
}

export function useUploadUserCover() {
  return useMutation({
    mutationKey: ['upload-user-cover'],
    mutationFn: (body: FormData) => uploadUserCover(body),
  })
}

export function useFollowUser() {
  return useMutation({
    mutationKey: ['follow-user'],
    mutationFn: (userId: string) => followUser(userId),
  })
}

export function useUnFollowUser() {
  return useMutation({
    mutationKey: ['unfollow-user'],
    mutationFn: (userId: string) => unFollowUser(userId),
  })
}

export function useUpdateProfile() {
  return useMutation({
    mutationKey: ['update-profile-data'],
    mutationFn: (body: UpdateProfilePayload) => updateProfile(body),
  })
}
