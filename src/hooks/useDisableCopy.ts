import { useEffect } from 'react'
const disabledKeys = ['c', 'C', 'x', 'J', 'u', 'I']

function isApple() {
  const expression = /(Mac|iPhone|iPod|iPad)/i
  return expression.test(navigator.platform)
}

export default function useDisableCopy() {
  const disableContextMenu = (e: MouseEvent) => {
    e.preventDefault()
  }

  const disableCopy = (e: KeyboardEvent) => {
    let controlKey = e.ctrlKey
    if (isApple()) {
      controlKey = e.metaKey
    }
    if ((controlKey && disabledKeys.includes(e.key)) || e.key === 'F12') {
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