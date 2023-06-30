import axios from 'axios'
import { getRefreshToken } from '@/services/auth/api'
import { useAuth } from '@/store/useAuth'
import { BASE_API_URL } from './constants'
const { getState } = useAuth

export const httpRequest = () => {
  const instance = axios.create({
    baseURL: BASE_API_URL,
  })
  let count = 0

  instance.interceptors.request.use(
    function (config: any) {
      const accessToken = getState().token
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      }
      return config
    },
    function (error: any) {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (response: any) {
      return response
    },
    async function (error: any) {
      const originalRequest = error.config

      if (
        error?.response?.status === 401 &&
        count < 2 &&
        !originalRequest?._retry
      ) {
        count += 1
        originalRequest._retry = true
        const refreshToken = getState().refreshToken
        const data = await getRefreshToken(refreshToken)
        getState().login({
          token: data.token,
          expirationDate: data.expirationDate,
          refreshToken: '',
        })
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        return instance(originalRequest)
      } else if (
        error?.response?.status === 401 &&
        error?.config?.method === 'get' &&
        !originalRequest._retry &&
        count >= 2
      ) {
        localStorage.clear()
        getState().logout()
        location.href = '/'
      }
      return Promise.reject(error)
    }
  )

  return instance
}

export const apiService = httpRequest()
