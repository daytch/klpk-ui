import React, { useState } from 'react'
import { useCreateWithdraw } from '@/services/payment/mutation'
import { useToast } from '@/hooks/useToast'
import BaseDialog, { BaseDialogProps } from '@/components/molecules/BaseDialog'
import CointOption from '@/components/molecules/CointOption'
import { createNumberArray } from '@/utils/common'
import Button from '@/components/atoms/Button'
import { CoinPackageDataModel } from '@/interfaces/payment'

type WithdrawDialogProps = {
  coinBalance: number
  onSuccessWithdraw: () => void
} & Pick<BaseDialogProps, 'isOpen' | 'onClose'>

export default function WithdrawDialog({
  coinBalance,
  onSuccessWithdraw,
  ...props
}: WithdrawDialogProps) {
  const data = createNumberArray(10000, coinBalance, 1000)
  const [selectedAmount, setSelectedAmount] = useState<CoinPackageDataModel>()
  const createWithdrawRequest = useCreateWithdraw()
  const toast = useToast()

  const createWithdraw = () => {
    if (!selectedAmount) return
    createWithdrawRequest.mutate(
      { amount: selectedAmount.amount },
      {
        onSuccess() {
          onSuccessWithdraw()
          props.onClose()
        },
        onError() {
          toast.addToast('error', 'Gagal request withdraw. Coba lagi.')
        },
      }
    )
  }

  return (
    <BaseDialog {...props}>
      <div
        className="w-full max-w-[500px] py-8 px-4 bg-dark-100 rounded-xl h-full max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-2xl font-bold font-gotham text-gold-200 mb-6">
          Pilih Jumlah Koin yang Ingin Ditarik
        </p>
        <div className="flex flex-wrap -mx-4">
          {data.map((coin, index) => {
            const option = {
              id: index.toString(),
              amount: coin,
            }
            return (
              <div key={index} className="w-full lg:w-1/2 p-4">
                <CointOption
                  viewMode="withdraw"
                  coint={option}
                  id={index.toString()}
                  onChange={function (value): void {
                    setSelectedAmount(value)
                  }}
                  checked={selectedAmount?.id === option.id}
                />
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-end space-x-4">
          <Button
            disabled={createWithdrawRequest.isLoading}
            onClick={props.onClose}
            variant="outlined"
            isFullWidth={false}
          >
            Batal
          </Button>
          <Button
            onClick={createWithdraw}
            disabled={!selectedAmount || createWithdrawRequest.isLoading}
            variant="primary"
            isFullWidth={false}
          >
            Proses
          </Button>
        </div>
      </div>
    </BaseDialog>
  )
}
