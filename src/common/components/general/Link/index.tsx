import NextLink from 'next/link'
import React, { ComponentPropsWithRef, forwardRef } from 'react'

interface IProps extends ComponentPropsWithRef<'a'> {
  to: string
}

const Link: React.FC<IProps> = forwardRef(({ to, ...props }, ref) => {
  return (
    <NextLink href={to} legacyBehavior>
      <a ref={ref} {...props} />
    </NextLink>
  )
})

Link.displayName = 'Link'

export default Link
