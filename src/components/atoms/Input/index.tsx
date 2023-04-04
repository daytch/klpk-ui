import { joinClass } from '@/utils/common'
import React, { ComponentPropsWithRef, forwardRef } from 'react'

export interface IInputProps extends ComponentPropsWithRef<'input'> {
  errormessage?: string
  isInvalid?: boolean
  isDisabled?: boolean
  className?: string
}

const Input: React.FC<IInputProps> = forwardRef(
  ({ className, isInvalid = false, isDisabled = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        disabled={isDisabled}
        className={joinClass(
          'py-4 px-5 ring-1 ring-gold-100 border-0 text-gold-200 outline-none rounded text-sm leading-4 w-full bg-dark-100 placeholder:text-gold-300 disabled:bg-dark-300 disabled:text-gold-300 disabled:cursor-not-allowed',
          className ?? '',
          isInvalid ? 'ring-danger' : ''
        )}
        {...props}
      />
    )
  }
)

export default Input

Input.displayName = 'Input'
