import React from 'react'
import Image from 'next/image'
import { formatMoney, formatNumberWithCommas } from '@/utils/common'
import { CoinPackageDataModel } from '@/interfaces/payment'

interface CointOptionProps {
  checked?: boolean
  coint: CoinPackageDataModel
  id: string
  onChange: (value: CoinPackageDataModel) => void
  viewMode?: 'default' | 'withdraw'
}

const CointOption: React.FC<CointOptionProps> = ({
  checked,
  coint,
  id,
  onChange,
  viewMode = 'default',
}) => {
  return (
    <div className="bg-transparent">
      <input
        onChange={() => onChange(coint)}
        type="radio"
        id={id}
        name={id}
        className="hidden peer"
        checked={checked}
      />
      <label
        htmlFor={id}
        className="py-3 px-6 inline-flex items-center rounded-xl space-x-[18px] bg-dark-100 border-2 border-dark-100 peer-checked:border-gold-200 w-full"
      >
        <Image
          alt=""
          width={56}
          height={50}
          src="/assets/icons/icon-coint-01.png"
        />
        <div className="font-gotham">
          <p className="font-inherit font-bold text-gold-200 text-xl leading-5 mb-2">
            {formatNumberWithCommas(coint.amount)} Coins
          </p>
          {viewMode === 'default' && coint.price && (
            <p className="text-white font-thin text-sm leading-3">
              {formatMoney(coint.price)}
            </p>
          )}
        </div>
      </label>
    </div>
  )
}

export default CointOption
