import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

type DropdownProps = {
  buttonComponent: React.ReactNode
  children: React.ReactNode
}

export default function Dropdown({ buttonComponent, children }: DropdownProps) {
  return (
    <div className="relative inline-block text-left">
      <DropdownMenu.Root
        onOpenChange={() => {
          if (typeof window !== undefined) {
            document.body.classList.add('dropdown-open')
          }
        }}
      >
        <DropdownMenu.Trigger className="inline-flex outline-none">
          {buttonComponent}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={-3}
            className="min-w-[164px] bg-dark-200 rounded-lg z-10"
          >
            {children}
            <DropdownMenu.Arrow className="DropdownMenuArrow fill-dark-200 w-[14px] h-[7px]" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
