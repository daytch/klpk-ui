export type NotificationDataModel = {
  id: string
  title: string
  content: string
  read?: boolean
  type: string
  creationDate: string
}

export type NotificationParams = {
  limit?: number
  page?: number
}
