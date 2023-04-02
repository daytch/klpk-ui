import { TransactionHistoryParams } from '@/interfaces/transaction'
import { useQuery } from '@tanstack/react-query'
import { getTransactionHistories } from './api'

export function useGetTransactionHistories(
  params: TransactionHistoryParams,
  enabled: boolean
) {
  return useQuery({
    queryKey: ['get-transaction-history', params],
    queryFn: () => getTransactionHistories(params),
    enabled,
    refetchOnWindowFocus: false,
  })
}
