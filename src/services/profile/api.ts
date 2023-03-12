import {
  ProfileFollowDataModel,
  ProfileParams,
  ProfileUserDataModel,
  UpdateProfilePayload,
  UserVeriticationPayload,
} from '@/interfaces/profile'
import { apiService } from '@/utils/httpRequest'

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

export async function updateVerificationUserRequest(
  id: string,
  body: UserVeriticationPayload
) {
  try {
    const response = await apiService.put('/verifications/' + id, body)
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

export async function updateProfile(body: UpdateProfilePayload) {
  try {
    const response = await apiService.put(apiUrl, body)
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function getFollowers(params: ProfileParams) {
  try {
    const response = await apiService.get<ProfileFollowDataModel[]>(
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

export async function getFollowings(params: ProfileParams) {
  try {
    const response = await apiService.get<ProfileFollowDataModel[]>(
      `/profiles/${params.userId}/followings`,
      {
        params,
      }
    )
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function followUser(userId: string) {
  try {
    const response = await apiService.post(`/follow/users/${userId}`)
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function unFollowUser(userId: string) {
  try {
    const response = await apiService.delete(`/follow/users/${userId}`)
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function getWriterProfile(userId: string) {
  try {
    const response = await apiService.get<ProfileUserDataModel>(
      `/profiles/${userId}`
    )
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
