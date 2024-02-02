import { useEffect } from 'react'
const disabledKeys = ['c', 'C', 'x', 'J', 'u', 'I']

const disableEvents: Array<keyof DocumentEventMap> = [
  'dragstart',
  'contextmenu',
]

function isApple() {
  const expression = /(Mac|iPhone|iPod|iPad)/i
  return expression.test(navigator.platform)
}

export default function useDisableCopy() {
  const disableContextMenu = (e: Event) => {
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
    document.addEventListener('keydown', disableCopy)
    disableEvents.forEach((event) => {
      document.addEventListener(event, disableContextMenu)
    })

    return () => {
      document.removeEventListener('keydown', disableCopy)
      disableEvents.forEach((event) => {
        document.removeEventListener(event, disableContextMenu)
      })
    }
  })
}
