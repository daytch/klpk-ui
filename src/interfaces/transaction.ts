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
