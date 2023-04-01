import { PublicParamsBooks } from '@/interfaces/book'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import {
  getBestSellerBooks,
  getDetailChapterById,
  getDetailPublicBookById,
  getBooks,
  getTopWriters,
} from './api'

export function useGetBooks(params: PublicParamsBooks, enabled: boolean) {
  return useQuery({
    queryKey: ['get-public-books', params],
    queryFn: () => getBooks(params),
    enabled,
    refetchOnWindowFocus: false,
  })
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
    queryFn: () => getDetailPublicBookById(bookId),
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
    queryFn: () => getDetailChapterById(params),
    onError: (error: AxiosError) => {
      errorCallback(error)
    },
    retry: 0,
    refetchOnWindowFocus: false,
  })
}
