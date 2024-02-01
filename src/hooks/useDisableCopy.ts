import { useEffect } from 'react'
const disabledKeys = ['c', 'C', 'x', 'J', 'u', 'I']

export default function useDisableCopy() {
  const disableContextMenu = (e: MouseEvent) => {
    e.preventDefault()
  }

  const disableCopy = (e: KeyboardEvent) => {
    if ((e.ctrlKey && disabledKeys.includes(e.key)) || e.key === 'F12') {
      e.preventDefault()
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    document.addEventListener('contextmenu', disableContextMenu)
    document.addEventListener('keydown', disableCopy)

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu)
      document.removeEventListener('keydown', disableCopy)
    }
  })
}
