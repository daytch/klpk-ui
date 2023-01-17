import { useAuth } from '@/store/useAuth'
import axios from 'axios'
import { BASE_API_URL } from './constants'
const { getState } = useAuth

export const httpRequest = () => {
  const instance = axios.create({
    baseURL: BASE_API_URL,
  })

  instance.interceptors.request.use((config: any) => {
    const accessToken = getState().token
    if (!!accessToken) {
      config.headers = `Bearer ${accessToken}`
    }
    return config
  })

  return instance
}
