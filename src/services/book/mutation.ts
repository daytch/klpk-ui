import { useMutation } from '@tanstack/react-query'
import { subscribeBook, unSubscribeBook } from './api'

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
