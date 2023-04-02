import React from 'react'
import IconChevron from '@/components/icons/IconChevron'
import {
  TransactionHistoryDataModel,
  TransactionHistoryStatus,
} from '@/interfaces/transaction'
import { createTableTextTransactionHistory, formatDate } from '@/utils/common'

interface TransactionHistoryTableProps {
  data?: TransactionHistoryDataModel[]
}

const TransactionHistoryTable: React.FC<TransactionHistoryTableProps> = ({
  data,
}) => {
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
        <table className="w-full border border-dark-100">
          <thead>
            <tr>
              <th
                scope="col"
                className="font-gotham font-bold px-3 py-2 bg-dark-200 text-kplkWhite text-xs text-left w-[60%]"
              >
                Aktivitas
              </th>
              <th
                scope="col"
                className="font-gotham font-bold px-3 py-2 bg-dark-200 text-kplkWhite text-xs text-left"
              >
                Tanggal
              </th>
            </tr>
          </thead>
          <tbody>
            {!data?.length && (
              <tr>
                <td
                  colSpan={2}
                  className="text-xs text-kplkWhite font-thin text-center py-2 px-3 border-b border-dark-100"
                >
                  Data tidak ditemukan.
                </td>
              </tr>
            )}
            {data &&
              data?.length > 0 &&
              data.map((item, index) => (
                <tr key={index}>
                  <td className="text-xs text-kplkWhite font-thin py-2 px-3 border-b border-dark-100 text-left">
                    {createTableTextTransactionHistory(
                      item.type as TransactionHistoryStatus,
                      item.metadata
                    )}
                  </td>
                  <td className="text-xs text-kplkWhite font-thin py-2 px-3 border-b border-dark-100 text-left">
                    {formatDate(item.transactionDate, 'DD MMMM YYYY')}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
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
