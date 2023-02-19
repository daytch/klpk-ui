import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getAllMyBooks, getChapterFromId, getMyBookFromId } from './api'

export function useMyBooks() {
  return useQuery({
    queryKey: ['get-all-mybooks'],
    queryFn: () => getAllMyBooks(),
  })
}

export function useGetMyBookFromId(id: string, enabled = true) {
  return useQuery({
    queryKey: ['get-my-book-from-id', id],
    queryFn: () => getMyBookFromId(id),
    enabled,
    keepPreviousData: true,
  })
}

export function useGetMyBookChapterFromId(
  params: { bookId: string; chapterId: string },
  enabled = true
) {
  return useQuery({
    queryKey: ['get-my-book-chapter-fromid', params],
    queryFn: () => getChapterFromId(params.bookId, params.chapterId),
    enabled,
    keepPreviousData: true,
  })
}

export function useGetInfiniteMyBook({
  params,
  enabled = true,
  pageParam = 1,
}: {
  params: { status?: string; limit?: number }
  enabled?: boolean
  pageParam?: number
}) {
  return useInfiniteQuery(
    ['infinite-my-books', pageParam, params],
    ({ pageParam }) => {
      const newParam = { ...params, page: pageParam }
      return getAllMyBooks(newParam)
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
