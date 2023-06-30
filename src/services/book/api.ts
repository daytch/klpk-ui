import {
  PublicBookDataModel,
  PublicChapterDetailDataModel,
  PublicParamsBooks,
} from '@/interfaces/book'
import { TopWriterDataModel } from '@/interfaces/writer'
import { apiService } from '@/utils/httpRequest'
const apiUrl = '/books'

export async function getBooks(params: PublicParamsBooks) {
  try {
    const response = await apiService.get<PublicBookDataModel[]>(
      '/public-books',
      {
        params,
      }
    )
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function getBestSellerBooks(scope: 'daily' | 'monthly') {
  try {
    const response = await apiService.get<PublicBookDataModel[]>(
      '/feed/best-seller',
      {
        params: { scope },
      }
    )
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function getTopWriters() {
  try {
    const response = await apiService.get<TopWriterDataModel[]>(
      '/feed/top-writers'
    )
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

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

export async function getDetailPublicChapterById(params: {
  bookId: string
  chapterId: string
}) {
  try {
    const response = await apiService.get<PublicChapterDetailDataModel>(
      `/public-books/${params.bookId}/chapters/${params.chapterId}`
    )
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
