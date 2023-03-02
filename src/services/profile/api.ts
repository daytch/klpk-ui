import {
  ProfileParams,
  ProfileUserDataModel,
  UserVeriticationPayload,
} from '@/interfaces/profile'
import { httpRequest } from '@/utils/httpRequest'

const apiService = httpRequest()
const apiUrl = '/@me'

export async function getMe() {
  const response = await apiService.get<ProfileUserDataModel>(apiUrl)
  return response.data
}

export async function createVerificationUserRequest(
  body: UserVeriticationPayload
) {
  try {
    const response = await apiService.post('/verifications', body)
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function uploadUserAvatar(body: FormData) {
  try {
    const response = await apiService.post(`${apiUrl}/avatars`, body)
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function uploadUserCover(body: FormData) {
  try {
    const response = await apiService.post(`${apiUrl}/covers`, body)
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function getFollowers(params: ProfileParams) {
  try {
    const response = await apiService.get(
      `/profiles/${params.userId}/followers`,
      {
        params,
      }
    )
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
