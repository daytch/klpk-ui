import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
const Portal = dynamic(() => import('../../atoms/Portal'), { ssr: false })

export type BaseDialogProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function BaseDialog({
  isOpen,
  onClose,
  children,
}: BaseDialogProps) {
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
        <Portal section={'div'} id={'toast-container'} className={''}>
          <div
            className="p-4 w-screen h-screen max-w-[100vw] max-h-[100vh] flex items-center justify-center bg-black/80 fixed top-0 bottom-0 left-0 right-0"
            onClick={onClose}
          >
            {children}
          </div>
        </Portal>
      )}
    </React.Fragment>
  )
}
