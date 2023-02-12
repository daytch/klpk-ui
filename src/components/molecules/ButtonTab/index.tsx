import React from 'react'
import { joinClass } from '@/utils/common'

type ButtonTabProps = {
  icon: JSX.Element
  text: string
  isActive?: boolean
  onClick: () => void
}

export default function ButtonTab({
  icon,
  text,
  isActive,
  onClick,
}: ButtonTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={joinClass(
        'inline-flex items-center text-xs font-gotham font-extralight px-7 py-2 space-x-3',
        isActive ? 'text-gold-200' : 'text-gold-300'
      )}
    >
      {icon}
      <span>{text}</span>
    </button>
  )
}
