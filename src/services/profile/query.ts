import { useQuery } from '@tanstack/react-query'
import { getMe } from './api'

export function useGetMe() {
  return useQuery({
    queryKey: ['get-profile-me'],
    queryFn: () => getMe(),
  })
}
