import React from 'react'
import dynamic from 'next/dynamic'
import Label, { ILabelProps } from '@/components/atoms/Label'
const Editor = dynamic(() => import('@/components/atoms/Editor'), {
  ssr: false,
})
import { joinClass } from '@/utils/common'
import { EditorProps } from '@/components/atoms/Editor'

interface TextEditorFieldProps {
  textEditorProps: EditorProps
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
      <Editor {...textEditorProps} />
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
