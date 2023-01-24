import { BookCategoryDataModel } from '@/interfaces/book'
import { httpRequest } from '@/utils/httpRequest'

const apiService = httpRequest()

export async function getCategories() {
  const response = await apiService.get<BookCategoryDataModel[]>('/categories')
  return response.data
}
