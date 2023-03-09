import { useMutation } from '@tanstack/react-query'
import { TopupParams } from '@/interfaces/payment'
import { createTopup, createWithdraw } from './api'

export function useCreateTopup() {
  return useMutation({
    mutationKey: ['create-topup'],
    mutationFn: (params: TopupParams) => createTopup(params),
  })
}

export function useCreateWithdraw() {
  return useMutation({
    mutationKey: ['create-withdraw'],
    mutationFn: (params: { amount: number }) => createWithdraw(params),
  })
}
