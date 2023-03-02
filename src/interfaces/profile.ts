import { APIBaseParams } from './api'

type ProfilePhotoDataMode = {
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
  photos?: ProfilePhotoDataMode[]
}

export type UserVeriticationPayload = {
  identityFullName: string
  identityNumber: string
  bankName: string
  bankAccountNumber: string
}

export type ProfileParams = {
  userId: string
} & APIBaseParams
