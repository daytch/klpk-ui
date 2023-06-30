import React from 'react'
import IconChevron from '@/components/icons/IconChevron'
import {
  TransactionHistoryDataModel,
  WithdrawDataModel,
} from '@/interfaces/transaction'
import TransactionTable from './TransactionTable'
import WithdrawTable from './WithdrawTable'

interface TransactionHistoryTableProps {
  data?: TransactionHistoryDataModel[] | WithdrawDataModel[]
  type: 'transaction' | 'withdraw'
}

const TransactionHistoryTable: React.FC<TransactionHistoryTableProps> = ({
  data,
  type,
}) => {
  const isTransactionType = type === 'transaction'

  const handlePagination = async (type: 'prev' | 'next') => {
    const Router = (await import('next/router')).default
    const page = Number(Router.query?.page ?? 1)
    if (type === 'prev' && page <= 1) return
    Router.push(
      {
        pathname: Router.pathname,
        query: {
          page: type === 'prev' ? page - 1 : page + 1,
        },
      },
      undefined,
      {
        scroll: false,
      }
    )
  }
  return (
    <div className="px-6 space-y-2">
      <div className="overflow-auto scrollbar">
        {isTransactionType ? (
          <TransactionTable
            data={(data ?? []) as TransactionHistoryDataModel[]}
          />
        ) : (
          <WithdrawTable data={(data ?? []) as WithdrawDataModel[]} />
        )}
      </div>

      <div className="flex items-center justify-end space-x-2">
        <button onClick={() => handlePagination('prev')}>
          <IconChevron />
        </button>
        <button
          disabled={!data?.length}
          onClick={() => handlePagination('next')}
        >
          <IconChevron className="rotate-180" />
        </button>
      </div>
    </div>
  )
}

export default TransactionHistoryTable
