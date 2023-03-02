import { ProfileParams } from '@/interfaces/profile'
import { useQuery } from '@tanstack/react-query'
import { getFollowers, getMe } from './api'

export function useGetMe() {
  return useQuery({
    queryKey: ['get-profile-me'],
    queryFn: () => getMe(),
  })
}

export function useGetFollowers(params: ProfileParams, enabled?: boolean) {
  return useQuery({
    queryKey: ['get-user-folowers', params],
    queryFn: () => getFollowers(params),
    enabled: !!params.userId && enabled,
  })
}
