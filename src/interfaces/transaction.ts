export interface TransactionHistoryDataModel {
  id: string
  type: string
  amount: number
  metadata: string
  transactionDate: string
}

export type TransactionHistoryStatus =
  | 'topup'
  | 'bookPurchase'
  | 'chapterPurchase'
  | 'bookSales'
  | 'chapterSales'
  | 'withdraw'
  | 'withdrawRejection'

export interface TransactionHistoryParams {
  limit?: number
  page?: number
  types?: TransactionHistoryStatus[]
}

export interface WithdrawDataModel {
  id: string
  amount: number
  price: number
  transferProof?: string
  transferDate?: string
  requestDate?: string
}

export interface WithdrawHistoryParams {
  status?: string
  page?: number
  limit?: number
}
