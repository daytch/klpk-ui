import { joinClass } from '@/utils/common'
import React, { ButtonHTMLAttributes } from 'react'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined'
  isFullWidth?: boolean
}

const buttonType = {
  primary:
    'bg-gold-200 text-dark-300 hover:bg-gold-200/95 focus:ring-2 focus:ring-gold-200 hover:text-dark-300/95 disabled:bg-gold-300 disabled:cursor-not-allowed',
  secondary:
    'bg-dark-300 text-white hover:bg-dark-300/95 focus:ring-2 focus:ring-dark-300 hover:text-white/95',
  outlined:
    'text-gold-200 border-gold-200 ring-1 ring-gold-200 disabled:bg-gold-300 disabled:text-dark-500',
  text: 'text-gold-200 font-base',
}

const Button: React.FC<IProps> = ({
  variant = 'primary',
  isFullWidth = true,
  ...props
}) => {
  return (
    <button
      {...props}
      className={joinClass(
        'inline-flex items-center justify-center px-4 py-[10px] font-sfpro font-normal min-h-[20px] rounded-lg text-base',
        buttonType[variant],
        isFullWidth ? 'w-full' : 'w-auto',
        props?.className ?? ''
      )}
    ></button>
  )
}

export default Button
