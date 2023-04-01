import { useQuery } from '@tanstack/react-query'
import { getBanners } from './api'

export function useGetBanners() {
  return useQuery({
    queryKey: ['get-banners'],
    queryFn: () => getBanners(),
  })
}
