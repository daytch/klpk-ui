import {
  BookDataModel,
  DetailBookDataModel,
  PayloadBook,
  PayloadChapter,
} from '@/interfaces/book'
import { httpRequest } from '@/utils/httpRequest'

const service = httpRequest()

export async function getAllMyBooks() {
  const response = await service.get<BookDataModel[]>('/my-books')
  return response.data
}

export async function createNewBook(data: PayloadBook) {
  const response = await service.post('/my-books', {
    ...data,
  })
  return response.data
}

export async function updateBookFromId(bookId: string, data: PayloadBook) {
  const response = await service.put(`/my-books/${bookId}`, data)
  return response.data
}

export async function getMyBookFromId(id: string) {
  const response = await service.get<DetailBookDataModel>('/my-books/' + id)
  return response.data
}

export async function updateBookCover(data: { File: any; id: string }) {
  const response = await service.post(
    `/my-books/${data.id}/covers`,
    data.File,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data
}

export async function createNewChapter(bookId: string, data: PayloadChapter) {
  const response = await service.post(`/my-books/${bookId}/chapters`, data)
  return response.data
}

export async function updateChapterFromId(
  bookId: string,
  chapterId: string,
  data: PayloadChapter
) {
  const response = await service.put(
    `/my-books/${bookId}/chapters/${chapterId}`,
    data
  )
  return response.data
}

export async function getChapterFromId(bookId: string, chapterId: string) {
  const response = await service.get(
    `/my-books/${bookId}/chapters/${chapterId}`
  )
  return response.data
}

export async function markBookAsDone(bookId: string) {
  const response = await service.put(`/my-books/${bookId}/toggle-complete`)
  return response.data
}

export async function publishBook(bookId: string) {
  const response = await service.put(`/my-books/${bookId}/publish`)
  return response.data
}
