import React from 'react'

type IconLogoutProps = {
  color?: string
}

export default function IconLogout({ color = '#D6B16D' }: IconLogoutProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.1251 9.75V11.445C16.1251 14.7975 14.7826 16.14 11.4301 16.14H11.3326C8.31762 16.14 6.93012 15.0525 6.68262 12.3975"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.67505 5.66999C6.90755 2.96999 8.29505 1.86749 11.3325 1.86749H11.43C14.7825 1.86749 16.125 3.20999 16.125 6.56249"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2501 9H2.71509"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.3875 6.48749L1.875 8.99999L4.3875 11.5125"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
