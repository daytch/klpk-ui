import {
  TransactionHistoryDataModel,
  TransactionHistoryParams,
} from '@/interfaces/transaction'
import { apiService } from '@/utils/httpRequest'

export async function getTransactionHistories(
  params: TransactionHistoryParams
) {
  let url = `/transactions?page=${params.page}&limit=${params.limit}`
  params.types?.forEach((type) => (url += `&types=${type}`))
  try {
    const response = await apiService.get<TransactionHistoryDataModel[]>(url)
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
