import React from 'react'
import BaseDialog, { BaseDialogProps } from '@/components/molecules/BaseDialog'
import Image from 'next/image'
import Button from '@/components/atoms/Button'
import { joinClass } from '@/utils/common'

type ActionDialogProps = {
  icon: string
  message: string
  title: string
  buttonConfirmText: string
  onConfirmAction: () => void
  buttonCancelText?: string
  onCancelAction?: () => void
} & Pick<BaseDialogProps, 'isOpen' | 'onClose'>

const ActionDialog: React.FC<ActionDialogProps> = ({
  icon,
  message,
  title,
  buttonConfirmText,
  onConfirmAction,
  buttonCancelText,
  onCancelAction = () => {},
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

        <div
          className={joinClass(
            'flex',
            buttonCancelText !== undefined ? 'space-x-4' : ''
          )}
        >
          {buttonCancelText !== undefined && (
            <Button type="button" variant="secondary" onClick={onCancelAction}>
              {buttonCancelText}
            </Button>
          )}
          <Button
            type="button"
            variant="primary"
            onClick={onConfirmAction}
            isFullWidth={buttonCancelText === undefined}
          >
            {buttonConfirmText}
          </Button>
        </div>
      </div>
    </BaseDialog>
  )
}

export default ActionDialog
