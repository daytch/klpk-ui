import React from 'react'
import TransactionLayout from '@/components/layouts/transaction'
import TransactionHistoryTable from '@/components/organisms/tables/TransactionHistoryTable'
import { TransactionHistoryDataModel } from '@/interfaces/transaction'
import Spinner from '@/components/molecules/Spinner'

interface TransactionHistoryTemplateProps {
  activeTab: 'transaksi' | 'withdraw' | 'penjualan'
  data?: TransactionHistoryDataModel[]
  isLoading?: boolean
  isError?: boolean
}

const TransactionHistoryTemplate: React.FC<TransactionHistoryTemplateProps> = ({
  activeTab,
  data,
  isError,
  isLoading,
}) => {
  return (
    <TransactionLayout activeTab={activeTab}>
      {isError && !isLoading && (
        <p className="text-center py-2 text-sm text-thin">
          Mohon maaf. Sedang terjadi masalah. Silahkan ulangi beberapa saat
          lagi.
        </p>
      )}
      {!isError && isLoading && <Spinner />}
      {!isError && !isLoading && <TransactionHistoryTable data={data} />}
    </TransactionLayout>
  )
}

export default TransactionHistoryTemplate
