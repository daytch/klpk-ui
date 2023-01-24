import React from 'react'
import Label, { ILabelProps } from '@/components/atoms/Label'
import Input, { IInputProps as IInputProps } from '@/components/atoms/Input'
import { joinClass } from '@/utils/common'

interface IProps {
  className?: string
  labelProps: ILabelProps
  inputProps: IInputProps
}

const TextField: React.FC<IProps> = ({ className, labelProps, inputProps }) => {
  return (
    <div className={joinClass('w-full flex flex-col', className ?? '')}>
      <Label {...labelProps} className="mb-3" />
      <Input {...inputProps} className="mb-2" />
      <span
        className={joinClass(
          'text-danger/70 text-xs inline-block w-full',
          Boolean(inputProps?.errormessage) ? 'visible' : 'invisible'
        )}
      >
        {inputProps?.errormessage ?? ''}
      </span>
    </div>
  )
}

export default TextField
