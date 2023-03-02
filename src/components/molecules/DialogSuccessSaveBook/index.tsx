import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Button from '@/components/atoms/Button'

const Portal = dynamic(() => import('../../atoms/Portal'), { ssr: false })

interface DialogSuccessSaveBookProps {
  isOpen: boolean
  message: string
  onConfirm: () => void
  onCloseDialog: () => void
}

const DialogSuccessSaveBook: React.FC<DialogSuccessSaveBookProps> = ({
  isOpen,
  message,
  onCloseDialog,
  onConfirm,
}) => {
  useEffect(() => {
    if (typeof window !== undefined) {
      if (isOpen) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    }
  }, [isOpen])

  return (
    <React.Fragment>
      {isOpen && (
        <Portal section={'symbol'} id={'toast-container'} className={''}>
          <div
            className="p-4 w-screen h-screen max-w-[100vw] max-h-[100vh] flex items-center justify-center bg-black/80 fixed top-0 bottom-0 left-0 right-0"
            onClick={onCloseDialog}
          >
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
          </div>
        </Portal>
      )}
    </React.Fragment>
  )
}

export default DialogSuccessSaveBook
