import { joinClass } from '@/utils/common'
import React from 'react'

interface IconStarProps {
  size?: number
  fill?: string
  className?: string
}

const IconStar: React.FC<IconStarProps> = ({
  size = 10,
  fill = '#D6B16D',
  className = '',
}) => {
  return (
    <svg
      className={joinClass(className ?? '')}
      width={size}
      height={size}
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.71927 1.42285L6.57054 3.11625C6.68716 3.34868 6.99381 3.57719 7.25183 3.6166L8.78687 3.87121C9.7698 4.0321 9.99694 4.74311 9.29584 5.4509L8.10166 6.64972C7.90228 6.85065 7.78739 7.24441 7.85347 7.52038L8.19712 9.00059C8.46725 10.1692 7.84818 10.6248 6.81574 10.0154L5.3735 9.16396C5.11085 9.00834 4.68376 9.01268 4.42524 9.16562L2.98684 10.0183C1.95718 10.6278 1.33504 10.1754 1.60168 9.00692L1.94245 7.52825C2.00608 7.25184 1.89508 6.85826 1.69415 6.65888L0.488577 5.4626C-0.214789 4.75918 0.0098471 4.0478 0.99051 3.88219L2.5217 3.62471C2.7802 3.57912 3.08648 3.35586 3.20017 3.12092L4.04631 1.42158C4.50829 0.50625 5.25977 0.506404 5.71927 1.42285Z"
        fill={fill}
      />
    </svg>
  )
}

export default IconStar
