import {
  CoinPackageDataModel,
  TCoinRate,
  TPriceSetting,
  TopupParams,
} from '@/interfaces/payment'
import { apiService } from '@/utils/httpRequest'

export async function getCoinPackages() {
  try {
    const response = await apiService.get<CoinPackageDataModel[]>(
      '/coin-packages'
    )
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function createTopup(params: TopupParams) {
  try {
    const response = await apiService.post('/topups', {
      ...params,
    })
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function createWithdraw(params: { amount: number }) {
  try {
    const response = await apiService.post('/withdraws', {
      ...params,
    })
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function getCoinRate() {
  try {
    const response = await apiService<TCoinRate>('/settings/coin-rate')
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function getPriceSetting() {
  try {
    const response = await apiService<TPriceSetting>('/settings/pricing')
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
