import { APIBaseParams } from './api'

export type ProfilePhotoDataModel = {
  type: string
  url: string
}

type ProfileVerification = {
  bankAccountNumber: string
  bankName: string
  id: string
  identityFullName: string
  identityNumber: string
  status: string
}

export type ProfileUserDataModel = {
  id: string
  fullName: string
  email: string
  username: string
  phone: string
  role: string
  verified: boolean
  bio?: string
  followersCount: number
  booksCount: number
  coinBalance: number
  verification?: ProfileVerification
  photos?: ProfilePhotoDataModel[]
}

export type UserVeriticationPayload = {
  identityFullName: string
  identityNumber: string
  bankName: string
  bankAccountNumber: string
}

export type ProfileParams = {
  userId?: string
} & APIBaseParams

export type ProfileFollowDataModel = {
  id: string
  fullName: string
  username: string
  following: boolean
  photos?: ProfilePhotoDataModel[]
}

export type UpdateProfilePayload = {
  fullName?: string
  email: string
  username: string
  phone: string
  bio?: string
}
