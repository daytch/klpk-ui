import { useMutation } from '@tanstack/react-query'
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
  return useMutation({
    mutationKey: ['purchases-book'],
    mutationFn: (data: { type: 'book' | 'chapter'; id: string }) =>
      purchaseBook(data),
  })
}
