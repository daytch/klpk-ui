import { WithdrawDataModel } from '@/interfaces/transaction'
import { formatDate, formatMoney } from '@/utils/common'
import React from 'react'

const WithdrawTable = ({ data }: { data?: WithdrawDataModel[] }) => {
  return (
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
          <th
            scope="col"
            className="font-gotham font-bold px-3 py-2 bg-dark-200 text-kplkWhite text-xs text-left"
          >
            Bukti Transfer
          </th>
        </tr>
      </thead>
      <tbody>
        {!data?.length && (
          <tr>
            <td
              colSpan={3}
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
                {`Withdraw ${item?.amount} -> ${formatMoney(item?.price ?? 0)}`}
              </td>
              <td className="text-xs text-kplkWhite font-thin py-2 px-3 border-b border-dark-100 text-left">
                {formatDate(item?.requestDate ?? '', 'DD MMMM YYYY')}
              </td>
              <td className="text-xs text-kplkWhite font-thin py-2 px-3 border-b border-dark-100 text-left">
                {item?.transferProof !== undefined &&
                item?.transferProof?.length > 0 ? (
                  <a
                    href={item?.transferProof}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Bukti Transfer
                  </a>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default WithdrawTable
