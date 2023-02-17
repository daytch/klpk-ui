import React from 'react'

type IconBrushProps = {
  color?: string
}

export default function IconBrush({ color = '#D6B16D' }: IconBrushProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_518_1725)">
        <path
          d="M8.22754 1.5H6.72754C2.97754 1.5 1.47754 3 1.47754 6.75V11.25C1.47754 15 2.97754 16.5 6.72754 16.5H11.2275C14.9775 16.5 16.4775 15 16.4775 11.25V9.75"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.4101 2.67001C15.4876 4.97251 13.1701 8.10751 11.2351 9.66001L10.0501 10.605C9.90008 10.7175 9.75008 10.8075 9.57758 10.875C9.57758 10.7625 9.57008 10.65 9.55508 10.53C9.48758 10.0275 9.26258 9.55501 8.85758 9.15751C8.44508 8.74501 7.95008 8.51251 7.44008 8.44501C7.32008 8.43751 7.20008 8.43001 7.08008 8.43751C7.14758 8.25001 7.24508 8.07751 7.37258 7.93501L8.31758 6.75001C9.87008 4.81501 13.0126 2.48251 15.3076 1.56001C15.6601 1.42501 16.0051 1.53001 16.2226 1.74751C16.4476 1.97251 16.5526 2.31751 16.4101 2.67001Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.58507 10.8675C9.58507 11.5275 9.33007 12.1575 8.85757 12.6375C8.49007 13.005 7.99507 13.26 7.40257 13.335L5.92507 13.4925C5.12257 13.5825 4.43257 12.9 4.52257 12.0825L4.68007 10.605C4.82257 9.29249 5.91757 8.45249 7.08757 8.42999C7.20757 8.42249 7.32757 8.42999 7.44757 8.43749C7.95757 8.50499 8.45257 8.73749 8.86507 9.14999C9.27007 9.55499 9.49507 10.02 9.56257 10.5225C9.57757 10.6425 9.58507 10.7625 9.58507 10.8675Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.865 8.98499C11.865 7.41749 10.5975 6.14249 9.02246 6.14249"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_518_1725">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
