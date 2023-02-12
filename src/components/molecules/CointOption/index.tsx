import React from 'react'
import Image from 'next/image'
import { formatMoney, formatNumberWithCommas } from '@/utils/common'

export interface CointPriceDataModel {
  amount: number
  price: number
}

interface CointOptionProps {
  checked?: boolean
  coint: CointPriceDataModel
  id: string
  onChange: (value: CointPriceDataModel) => void
}

const CointOption: React.FC<CointOptionProps> = ({
  checked,
  coint,
  id,
  onChange,
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
        className="py-3 px-6 inline-flex items-center rounded-xl space-x-[18px] bg-dark-100 border-2 border-dark-100 peer-checked:border-gold-200"
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
          <p className="text-white font-thin text-sm leading-3">
            {formatMoney(coint.price)}
          </p>
        </div>
      </label>
    </div>
  )
}

export default CointOption
