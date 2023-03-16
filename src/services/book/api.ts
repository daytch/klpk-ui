import { PublicBookDataModel } from '@/interfaces/book'
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
    const response = await apiService.get<PublicBookDataModel>(
      `${apiUrl}/${params.bookId}/chapters/${params.chapterId}`
    )
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
