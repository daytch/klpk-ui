import { joinClass } from '@/utils/common'
import React from 'react'

interface IIconCheckProps {
  className?: string
}

const IconCheck: React.FC<IIconCheckProps> = ({ className = '' }) => {
  return (
    <svg
      aria-hidden="true"
      className={joinClass(className ?? '')}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clip-rule="evenodd"
      ></path>
    </svg>
  )
}

export default IconCheck
