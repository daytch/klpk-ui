import { useInfiniteQuery } from '@tanstack/react-query'
import { getMyLibraries } from './api'

export function useGetMyLibraries({
  params,
  enabled = true,
  pageParam = 1,
}: {
  params: { limit?: number }
  enabled?: boolean
  pageParam?: number
}) {
  return useInfiniteQuery(
    ['infinite-my-libraries', pageParam, params],
    ({ pageParam }) => {
      const newParam = { ...params, page: pageParam }
      return getMyLibraries(newParam)
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
