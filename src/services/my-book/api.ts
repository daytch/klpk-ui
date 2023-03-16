import {
  BookDataModel,
  DetailBookDataModel,
  GetMyBookParams,
  PayloadBook,
  PayloadChapter,
} from '@/interfaces/book'
import { apiService } from '@/utils/httpRequest'
const apiUrl = '/books'

export async function getAllMyBooks(params?: GetMyBookParams) {
  const response = await apiService.get<BookDataModel[]>(`${apiUrl}/@me`, {
    params,
  })
  return response.data
}

export async function createNewBook(data: PayloadBook) {
  const response = await apiService.post(apiUrl, {
    ...data,
  })
  return response.data
}

export async function updateBookFromId(bookId: string, data: PayloadBook) {
  const response = await apiService.put(`${apiUrl}/${bookId}`, data)
  return response.data
}

export async function getMyBookFromId(id: string) {
  try {
    const response = await apiService.get<DetailBookDataModel>(
      `${apiUrl}/${id}`
    )
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function updateBookCover(data: { File: any; id: string }) {
  const response = await apiService.post(
    `${apiUrl}/${data.id}/covers`,
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
  const response = await apiService.post(`${apiUrl}/${bookId}/chapters`, data)
  return response.data
}

export async function updateChapterFromId(
  bookId: string,
  chapterId: string,
  data: PayloadChapter
) {
  const response = await apiService.put(
    `${apiUrl}/${bookId}/chapters/${chapterId}`,
    data
  )
  return response.data
}

export async function getChapterFromId(bookId: string, chapterId: string) {
  const response = await apiService.get(
    `${apiUrl}/${bookId}/chapters/${chapterId}`
  )
  return response.data
}

export async function markBookAsDone(bookId: string) {
  const response = await apiService.put(`${apiUrl}/${bookId}/complete`)
  return response.data
}

export async function publishBook(bookId: string) {
  const response = await apiService.put(`${apiUrl}/${bookId}/publish`)
  return response.data
}

export async function getPublicBooks(params?: GetMyBookParams) {
  try {
    const response = await apiService.get<BookDataModel[]>(`${apiUrl}`, {
      params,
    })
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
