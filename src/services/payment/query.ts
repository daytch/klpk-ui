import { useQuery } from '@tanstack/react-query'
import { getCoinPackages } from './api'

export function useGetCoinPackages() {
  return useQuery({
    queryKey: ['get-coin-packages'],
    queryFn: () => getCoinPackages(),
    enabled: true,
  })
}
