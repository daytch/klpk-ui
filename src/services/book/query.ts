import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getDetailChapterById, getDetailPublicBookById } from './api'

export function useGetDetailPublicBookById(bookId: string) {
  return useQuery({
    queryKey: ['get-detail-public-book', bookId],
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
  const [hasError, setHasError] = useState(false)
  return useQuery({
    queryKey: ['get-detail-detail-chapter', params],
    queryFn: () => getDetailChapterById(params),
    onError: (err: AxiosError) => {
      if (err?.response?.status === 403) {
        setHasError(true)
      }
      errorCallback(err)
    },
    refetchOnWindowFocus: false,
    enabled: !hasError,
  })
}
