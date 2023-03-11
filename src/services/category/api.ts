import { BookCategoryDataModel } from '@/interfaces/book'
import { apiService } from '@/utils/httpRequest'

export async function getCategories() {
  const response = await apiService.get<BookCategoryDataModel[]>('/categories')
  return response.data
}
