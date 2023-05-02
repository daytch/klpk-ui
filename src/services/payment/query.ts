import { useQuery } from '@tanstack/react-query'
import { getCoinPackages, getCoinRate } from './api'

export function useGetCoinPackages() {
  return useQuery({
    queryKey: ['get-coin-packages'],
    queryFn: () => getCoinPackages(),
    enabled: true,
  })
}

export function useGetCoinRate(enabled: boolean) {
  return useQuery({
    queryKey: ['get-coin-rate'],
    queryFn: () => getCoinRate(),
    enabled,
  })
}
