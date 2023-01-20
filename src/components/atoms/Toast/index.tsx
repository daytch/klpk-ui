import React from 'react'
import IconCheck from '@/components/icons/IconCheck'
import IconClose from '@/components/icons/IconClose'
import IconDanger from '@/components/icons/IconDanger'
import { joinClass } from '@/utils/common'

interface IProps {
  type?: 'success' | 'error'
  message: string
  onHide: () => void
}

const Toast: React.FC<IProps> = ({ type = 'success', message, onHide }) => {
  return (
    <div
      className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow"
      role="alert"
    >
      <div
        className={joinClass(
          'inline-flex items-center justify-center flex-shrink-0 w-8 h-8  rounded-lg',
          type === 'success'
            ? 'text-green-500 bg-green-100'
            : 'text-red-500 bg-red-100'
        )}
      >
        {type === 'success' && (
          <>
            <IconCheck className="w-5 h-5" />
            <span className="sr-only">Check icon</span>
          </>
        )}
        {type === 'error' && (
          <>
            <IconDanger className="w-5 h-5" />
            <span className="sr-only">Error icon</span>
          </>
        )}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        onClick={onHide}
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
        data-dismiss-target="#toast-success"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <IconClose className="w-5 h-5" />
      </button>
    </div>
  )
}

export default Toast
