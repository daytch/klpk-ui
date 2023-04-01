import { BookLibraryDataModel } from '@/interfaces/book'
import { apiService } from '@/utils/httpRequest'

export async function getMyLibraries(params: { page: number; limit?: number }) {
  try {
    const response = await apiService.get<BookLibraryDataModel[]>(
      '/libraries',
      { params }
    )
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
