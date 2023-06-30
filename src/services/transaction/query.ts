import {
  TransactionHistoryParams,
  WithdrawHistoryParams,
} from '@/interfaces/transaction'
import { useQuery } from '@tanstack/react-query'
import { getTransactionHistories, getWithdrawHistory } from './api'

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

export function useGetWithdrawHistories(
  params: WithdrawHistoryParams,
  enabled: boolean
) {
  return useQuery({
    queryKey: ['get-withdraw-history', params],
    queryFn: () => getWithdrawHistory(params),
    enabled,
    refetchOnWindowFocus: false,
  })
}
