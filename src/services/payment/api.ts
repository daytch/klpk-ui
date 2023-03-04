import { CoinPackageDataModel, TopupParams } from '@/interfaces/payment'
import { httpRequest } from '@/utils/httpRequest'

const service = httpRequest()

export async function getCoinPackages() {
  try {
    const response = await service.get<CoinPackageDataModel[]>('/coin-packages')
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function createTopup(params: TopupParams) {
  try {
    const response = await service.post('/topups', {
      ...params,
    })
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
