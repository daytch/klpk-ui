import React from 'react'
import Label, { ILabelProps } from '@/components/atoms/Label'
import { HtmlEditorProps } from '@/components/atoms/TextEditor'
const TextEditor = dynamic(() => import('../../atoms/TextEditor'), {
  ssr: false,
})
import { joinClass } from '@/utils/common'
import dynamic from 'next/dynamic'

interface TextEditorFieldProps {
  textEditorProps: HtmlEditorProps
  labelProps: ILabelProps
  className?: string
  errorMessage?: string
}

const TextEditorField: React.FC<TextEditorFieldProps> = ({
  textEditorProps,
  labelProps,
  errorMessage,
  className,
}) => {
  return (
    <div className={joinClass('w-full flex flex-col', className ?? '')}>
      <Label {...labelProps} className="mb-3" />
      <TextEditor {...textEditorProps} />
      <span
        className={joinClass(
          'text-danger/70 text-xs inline-block w-full mt-2',
          Boolean(errorMessage) ? 'visible' : 'invisible'
        )}
      >
        {errorMessage ?? ''}
      </span>
    </div>
  )
}

export default TextEditorField
