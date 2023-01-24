import { useQuery } from '@tanstack/react-query'
import { getCategories } from './api'

export function useGetCategories() {
  return useQuery({
    queryKey: ['get-all-categories'],
    queryFn: getCategories,
  })
}
