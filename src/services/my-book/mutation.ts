import { PayloadBook, PayloadChapter } from '@/interfaces/book'
import { useMutation } from '@tanstack/react-query'
import {
  createNewBook,
  createNewChapter,
  markBookAsDone,
  publishBook,
  updateBookCover,
  updateBookFromId,
  updateChapterFromId,
} from './api'

export function useCreateNewBook() {
  return useMutation({
    mutationFn: (newBook: PayloadBook) => {
      return createNewBook(newBook)
    },
  })
}

export function useUploadBookCover() {
  return useMutation({
    mutationFn: (data: { File: any; id: string }) => {
      return updateBookCover(data)
    },
  })
}

export function useCreateNewChapter() {
  return useMutation({
    mutationFn: (data: { bookId: string; newChapter: PayloadChapter }) => {
      return createNewChapter(data.bookId, data.newChapter)
    },
  })
}

export function useUpdateChapterFromId() {
  return useMutation({
    mutationFn: (data: {
      bookId: string
      chapterid: string
      newChapter: PayloadChapter
    }) => {
      return updateChapterFromId(data.bookId, data.chapterid, data.newChapter)
    },
  })
}

export function useUpdateBookFromId() {
  return useMutation({
    mutationFn: (data: { bookId: string; payloadBook: PayloadBook }) => {
      return updateBookFromId(data.bookId, data.payloadBook)
    },
  })
}

export function useMarkBookAsDone() {
  return useMutation({
    mutationFn: (data: { bookId: string }) => {
      return markBookAsDone(data.bookId)
    },
  })
}

export function usePublishBook() {
  return useMutation({
    mutationFn: (data: { bookId: string }) => {
      return publishBook(data.bookId)
    },
  })
}
