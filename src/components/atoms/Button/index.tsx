import { joinClass } from '@/utils/common'
import React, { ButtonHTMLAttributes } from 'react'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

const buttonType = {
  primary:
    'bg-gold-200 text-dark-300 hover:bg-gold-200/95 focus:ring-2 focus:ring-gold-200 hover:text-dark-300/95',
  secondary:
    'bg-dark-300 text-white hover:bg-dark-300/95 focus:ring-2 focus:ring-dark-300 hover:text-white/95',
}

const Button: React.FC<IProps> = ({ variant = 'primary', ...props }) => {
  return (
    <button
      {...props}
      className={joinClass(
        'inline-flex items-center justify-center w-full px-4 py-[10px] font-sfpro font-normal min-h-[20px] rounded-lg text-base',
        buttonType[variant],
        props?.className ?? ''
      )}
    ></button>
  )
}

export default Button
