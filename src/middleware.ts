import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
// const MOBILE_REGEX = /android|iphone|kindle|ipad/i
// const ALLOW_MOBILE = ['/auth/verify', '/auth/recover-password']

const ALLOW_MOBILE: string[] = []

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // const userAgent = request.headers.get('user-agent')
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname) ||
    ALLOW_MOBILE.includes(pathname)
  )
    return NextResponse.next()

  return NextResponse.rewrite(new URL('/download-app', request.url))

  // return MOBILE_REGEX.test(userAgent || '')
  //   ? NextResponse.rewrite(new URL('/download-app', request.url))
  //   : NextResponse.next()
}
