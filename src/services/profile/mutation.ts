import { useMutation } from '@tanstack/react-query'
import { UserVeriticationPayload } from '@/interfaces/profile'
import {
  createVerificationUserRequest,
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
