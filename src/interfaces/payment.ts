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
