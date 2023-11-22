import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
const MOBILE_REGEX = /android|iphone|kindle|ipad/i

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const userAgent = request.headers.get('user-agent')

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname)
  )
    return NextResponse.next()

  return MOBILE_REGEX.test(userAgent || '')
    ? NextResponse.rewrite(new URL('/download-app', request.url))
    : NextResponse.next()
}
