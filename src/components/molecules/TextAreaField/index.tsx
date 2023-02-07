import React from 'react'
import Label, { ILabelProps } from '@/components/atoms/Label'
import { joinClass } from '@/utils/common'
import TextArea, { ITextAreaProps } from '@/components/atoms/TextArea'

interface IProps {
  className?: string
  labelProps: ILabelProps
  textAreaProps: ITextAreaProps
}

const TextAreaField: React.FC<IProps> = ({
  className,
  labelProps,
  textAreaProps,
}) => {
  return (
    <div className={joinClass('w-full flex flex-col', className ?? '')}>
      <Label {...labelProps} className="mb-3" />
      <TextArea {...textAreaProps} className="mb-2" />
      <span
        className={joinClass(
          'text-danger/70 text-xs inline-block w-full',
          Boolean(textAreaProps?.errormessage) ? 'visible' : 'invisible'
        )}
      >
        {textAreaProps?.errormessage ?? ''}
      </span>
    </div>
  )
}

export default TextAreaField
