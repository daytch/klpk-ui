import { joinClass } from '@/utils/common'
import React, { LabelHTMLAttributes } from 'react'

export interface IProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  isRequired?: boolean
}

const Label: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <label
      {...props}
      className={joinClass(
        'text-gold-100 text-base font-normal leading-5',
        props?.className ?? ''
      )}
    >
      {children}
    </label>
  )
}

export default Label
