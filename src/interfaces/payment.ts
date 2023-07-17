export type CoinPackageDataModel = {
  id: string
  amount: number
  price?: number
}

export type TopupParams = {
  coinPackageId: string
}

export type TopupResponse = {
  id: string
  paymentToken: string
}

export type TCoinRate = {
  sellRate: number
  withdrawRate: number
  minimumWithdrawAmount: number
}

export type TPriceSetting = {
  coinForBook: number
  coinForChapter: number
  maximumFreeChaptersCount: number
}
