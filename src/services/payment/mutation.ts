import { useMutation } from '@tanstack/react-query'
import { TopupParams } from '@/interfaces/payment'
import { createTopup } from './api'

export function useCreateTopup() {
  return useMutation({
    mutationKey: ['create-topup'],
    mutationFn: (params: TopupParams) => createTopup(params),
  })
}
