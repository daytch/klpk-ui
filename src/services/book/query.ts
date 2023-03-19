import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { getDetailChapterById, getDetailPublicBookById } from './api'

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
