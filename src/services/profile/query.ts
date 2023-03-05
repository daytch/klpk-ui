import { ProfileParams } from '@/interfaces/profile'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getFollowers, getFollowings, getMe } from './api'

export function useGetMe() {
  return useQuery({
    queryKey: ['get-profile-me'],
    queryFn: () => getMe(),
  })
}

export function useGetFollowers({
  params,
  enabled = true,
  pageParam = 1,
}: {
  params: Omit<ProfileParams, 'page'>
  enabled?: boolean
  pageParam?: number
}) {
  return useInfiniteQuery(
    ['get-user-folowers', pageParam, params],
    ({ pageParam }) => {
      const newParam = { ...params, page: pageParam }
      return getFollowers(newParam)
    },
    {
      enabled: !!params.userId && enabled,
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined
      },
    }
  )
}

export function useGetFollowings({
  params,
  enabled = true,
  pageParam = 1,
}: {
  params: Omit<ProfileParams, 'page'>
  enabled?: boolean
  pageParam?: number
}) {
  return useInfiniteQuery(
    ['get-user-following', pageParam, params],
    ({ pageParam }) => {
      const newParam = { ...params, page: pageParam }
      return getFollowings(newParam)
    },
    {
      enabled: !!params.userId && enabled,
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined
      },
    }
  )
}
