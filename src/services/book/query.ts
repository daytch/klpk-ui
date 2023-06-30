import { PublicParamsBooks } from '@/interfaces/book'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import {
  getBestSellerBooks,
  getBooks,
  getTopWriters,
  getDetailPublicChapterById,
} from './api'
import { getPublicBookById } from '../my-book/api'

export function useGetBooks(params: PublicParamsBooks, enabled: boolean) {
  return useQuery({
    queryKey: ['get-public-books', params],
    queryFn: () => getBooks(params),
    enabled,
    refetchOnWindowFocus: false,
  })
}

export function useGetInfiniteBooks({
  params,
  enabled = true,
  pageParam = 1,
}: {
  params: PublicParamsBooks
  enabled?: boolean
  pageParam?: number
}) {
  return useInfiniteQuery(
    ['infinite-public-books', pageParam, params],
    ({ pageParam }) => {
      const newParam = { ...params, page: pageParam }
      return getBooks(newParam)
    },
    {
      enabled,
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined
      },
      refetchOnWindowFocus: false,
    }
  )
}

export function useGetBestSellerBooks(
  scope: 'daily' | 'monthly',
  enabled: boolean,
  limit: number
) {
  return useQuery({
    queryKey: ['get-best-seller-books', scope, limit],
    queryFn: () => getBestSellerBooks(scope),
    enabled,
    select(data) {
      return data.slice(0, limit)
    },
    refetchOnWindowFocus: false,
  })
}

export function useGetTopWriters() {
  return useQuery({
    queryKey: ['get-top-writers'],
    queryFn: () => getTopWriters(),
    refetchOnWindowFocus: false,
  })
}

export function useGetDetailPublicBookById(bookId: string) {
  const { query } = useRouter()
  return useQuery({
    queryKey: ['get-detail-public-book', bookId, query],
    queryFn: () => getPublicBookById(bookId),
  })
}

export function useGetDetailChapterById(
  params: {
    bookId: string
    chapterId: string
  },
  errorCallback: (err: AxiosError) => void
) {
  return useQuery({
    queryKey: ['get-detail-detail-chapter', params],
    queryFn: () => getDetailPublicChapterById(params),
    onError: (error: AxiosError) => {
      errorCallback(error)
    },
    retry: 0,
    refetchOnWindowFocus: false,
  })
}
