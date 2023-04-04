import {
  NotificationDataModel,
  NotificationParams,
} from '@/interfaces/notification'
import { apiService } from '@/utils/httpRequest'

export async function getNotifications(params: NotificationParams) {
  try {
    const response = await apiService.get<NotificationDataModel[]>(
      '/notifications',
      { params }
    )
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
