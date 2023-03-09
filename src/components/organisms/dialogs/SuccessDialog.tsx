import Button from '@/components/atoms/Button'
import BaseDialog, { BaseDialogProps } from '@/components/molecules/BaseDialog'
import Image from 'next/image'
import React from 'react'

type SuccessDialogProps = {
  message: string
  onConfirm: () => void
} & Pick<BaseDialogProps, 'isOpen' | 'onClose'>

export default function SuccessDialog({
  message,
  onConfirm,
  ...props
}: SuccessDialogProps) {
  return (
    <BaseDialog {...props}>
      <div
        className="w-full max-w-[500px] pb-8 pt-10 px-4 flex flex-col justify-center items-center bg-dark-100 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src="/assets/images/checklist-success.svg"
          alt=""
          width={75}
          height={75}
          className="mb-6"
        />
        <p className="text-center font-gotham font-thin text-2xl leading-6 text-kplkWhite mb-3">
          Berhasil di Kirim
        </p>
        <p className="text-center font-gotham font-thin text-[14px] leading-6 text-kplkWhite mb-4">
          {message}
        </p>
        <Button
          type="button"
          variant="primary"
          onClick={onConfirm}
          isFullWidth={false}
        >
          Mengerti
        </Button>
      </div>
    </BaseDialog>
  )
}
