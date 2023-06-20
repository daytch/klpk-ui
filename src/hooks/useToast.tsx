import dynamic from 'next/dynamic'
import { createContext, useContext, useEffect, useState } from 'react'

const Toast = dynamic(() => import('../components/atoms/Toast'))
const Portal = dynamic(() => import('../components/atoms/Portal'))

interface Props {
  children: React.ReactNode
}

interface ToastData {
  type?: 'success' | 'error'
  message: string
}

interface IContext {
  addToast: (type: 'success' | 'error', message?: string) => void
}

const ToastContext = createContext<IContext>({
  addToast: () => {},
})

export const ToastProvider: React.FC<Props> = ({ children }) => {
  const [show, setShow] = useState(false)
  const [data, setData] = useState<ToastData>({
    type: 'success',
    message: '',
  })

  useEffect(() => {
    let timer: any
    if (show) {
      timer = setTimeout(hideToast, 5000)
    }

    return () => clearTimeout(timer)
  }, [show])

  const addToast = (type: 'success' | 'error', message?: string) => {
    setShow(true)
    setData({
      type,
      message: message ?? '',
    })
  }

  const hideToast = () => {
    setShow(false)
    setData({
      type: 'success',
      message: '',
    })
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {show && (
        <Portal section={'div'} id={'toastr-container'} className={''}>
          <Toast type={data.type} message={data.message} onHide={hideToast} />
        </Portal>
      )}
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  return useContext(ToastContext)
}
