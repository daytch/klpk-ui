import { BannerDataModel } from '@/interfaces/banner'
import { apiService } from '@/utils/httpRequest'

export async function getBanners() {
  try {
    const response = await apiService.get<BannerDataModel[]>('/banners')
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
