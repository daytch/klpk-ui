import React from 'react'
import { joinClass } from '@/utils/common'

interface IconArrowProps {
  className?: string
}

const IconArrow: React.FC<IconArrowProps> = ({ className }) => {
  return (
    <svg
      className={joinClass(className ?? '')}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.8225 14.115C10.68 14.115 10.5375 14.0625 10.425 13.95C10.2075 13.7325 10.2075 13.3725 10.425 13.155L14.58 9.00003L10.425 4.84503C10.2075 4.62753 10.2075 4.26753 10.425 4.05003C10.6425 3.83253 11.0025 3.83253 11.22 4.05003L15.7725 8.60253C15.99 8.82003 15.99 9.18003 15.7725 9.39753L11.22 13.95C11.1075 14.0625 10.965 14.115 10.8225 14.115Z"
        fill="#AF7F3E"
      />
      <path
        d="M15.2475 9.5625H2.625C2.3175 9.5625 2.0625 9.3075 2.0625 9C2.0625 8.6925 2.3175 8.4375 2.625 8.4375H15.2475C15.555 8.4375 15.81 8.6925 15.81 9C15.81 9.3075 15.555 9.5625 15.2475 9.5625Z"
        fill="#AF7F3E"
      />
    </svg>
  )
}

export default IconArrow
