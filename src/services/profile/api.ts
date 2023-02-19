import { ProfileUserDataModel } from '@/interfaces/profile'
import { httpRequest } from '@/utils/httpRequest'

const apiService = httpRequest()
const apiUrl = '/@me'

export async function getMe() {
  const response = await apiService.get<ProfileUserDataModel>(apiUrl)
  return response.data
}
