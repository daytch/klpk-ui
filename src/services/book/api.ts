import {
  PublicBookDataModel,
  PublicChapterDetailDataModel,
} from '@/interfaces/book'
import { apiService } from '@/utils/httpRequest'
const apiUrl = '/books'

export async function getDetailPublicBookById(bookId: string) {
  try {
    const response = await apiService.get<PublicBookDataModel>(
      `${apiUrl}/${bookId}`
    )
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function getDetailChapterById(params: {
  bookId: string
  chapterId: string
}) {
  try {
    const response = await apiService.get<PublicChapterDetailDataModel>(
      `${apiUrl}/${params.bookId}/chapters/${params.chapterId}`
    )
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function subscribeBook(bookId: string) {
  try {
    const response = await apiService.post(`/books/${bookId}/subscription`)
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function unSubscribeBook(bookId: string) {
  try {
    const response = await apiService.delete(`/books/${bookId}/subscription`)
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function purchaseBook(data: {
  type: 'book' | 'chapter'
  id: string
}) {
  try {
    const response = await apiService.post('/purchases', data)
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
