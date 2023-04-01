export type TopWriterDataModel = {
  userId: string
  fullName: string
  username: string
  bio: string
  verified: boolean
  photos: { type: string; url: string }[]
}
