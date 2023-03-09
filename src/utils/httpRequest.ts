import { useAuth } from '@/store/useAuth'
import axios from 'axios'
import { BASE_API_URL } from './constants'
const { getState } = useAuth

export const httpRequest = () => {
  const instance = axios.create({
    baseURL: BASE_API_URL,
  })

  const accessToken = getState().token

  instance.interceptors.request.use(
    (config: any) => {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return instance
}
