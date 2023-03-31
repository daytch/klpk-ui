import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { purchaseBook, subscribeBook, unSubscribeBook } from './api'

export function useSubsribeBook() {
  return useMutation({
    mutationKey: ['subscribe-book'],
    mutationFn: (bookId: string) => subscribeBook(bookId),
  })
}

export function useUnSubscribeBook() {
  return useMutation({
    mutationKey: ['subscribe-book'],
    mutationFn: (bookId: string) => unSubscribeBook(bookId),
  })
}

export function usePurchaseBook() {
  return useMutation<
    any,
    AxiosError<{ errorCode: string }>,
    { type: 'book' | 'chapter'; id: string }
  >({
    mutationKey: ['purchases-book'],
    mutationFn: (data: { type: 'book' | 'chapter'; id: string }) =>
      purchaseBook(data),
  })
}
