import { joinClass } from '@/utils/common'
import React from 'react'

interface IconChevronProps {
  className?: string
  fill?: string
}

const IconChevron: React.FC<IconChevronProps> = ({
  className = '',
  fill = '#726A64',
}) => {
  return (
    <svg
      className={joinClass(className ?? '')}
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.575 11.35C5.3375 11.35 5.1 11.2625 4.9125 11.075L0.500002 6.66251C0.137502 6.30001 0.137502 5.70001 0.500002 5.33751L4.9125 0.925012C5.275 0.562512 5.875 0.562512 6.2375 0.925012C6.6 1.28751 6.6 1.88751 6.2375 2.25001L2.4875 6.00001L6.2375 9.75001C6.6 10.1125 6.6 10.7125 6.2375 11.075C6.0625 11.2625 5.825 11.35 5.575 11.35Z"
        fill={fill}
      />
    </svg>
  )
}

export default IconChevron
