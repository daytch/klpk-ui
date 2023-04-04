import { NotificationParams } from '@/interfaces/notification'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getNotifications } from './api'

export function useGetNotifications({
  params,
  enabled = true,
  pageParam = 1,
}: {
  params: NotificationParams
  enabled?: boolean
  pageParam?: number
}) {
  return useInfiniteQuery(
    ['infinite-notifications', pageParam, params],
    ({ pageParam }) => {
      const newParam = { ...params, page: pageParam }
      return getNotifications(newParam)
    },
    {
      enabled,
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined
      },
    }
  )
}
