import React from 'react'
import BaseDialog, { BaseDialogProps } from '@/components/molecules/BaseDialog'
import Image from 'next/image'
import Button from '@/components/atoms/Button'

type ActionDialogProps = {
  icon: string
  message: string
  title: string
  buttonText: string
  onConfirm: () => void
} & Pick<BaseDialogProps, 'isOpen' | 'onClose'>

const ActionDialog: React.FC<ActionDialogProps> = ({
  icon,
  message,
  title,
  buttonText,
  onConfirm,
  ...props
}) => {
  return (
    <BaseDialog {...props}>
      <div
        className="w-full max-w-[339px] pb-8 pt-10 px-4 flex flex-col justify-center items-center bg-dark-100 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center mb-8 text-gold-200 font-bold font-gotham text-xl">
          {title}
        </h2>
        <Image src={icon} alt="" width={75} height={75} className="mb-8" />
        <p className="text-center font-gotham font-thin text-sm leading-6 text-kplkWhite mb-10">
          {message}
        </p>

        <Button
          type="button"
          variant="primary"
          onClick={onConfirm}
          isFullWidth={false}
        >
          {buttonText}
        </Button>
      </div>
    </BaseDialog>
  )
}

export default ActionDialog
