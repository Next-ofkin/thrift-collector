import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const supabase = await createClient()   // <-- await added
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return NextResponse.next()

  const role = user.user_metadata?.role
  const { pathname } = req.nextUrl

  if (pathname === '/' && role === 'agent')
    return NextResponse.redirect(new URL('/agent', req.url))
  if (pathname === '/' && role === 'customer')
    return NextResponse.redirect(new URL('/customer', req.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/agent/:path*', '/customer/:path*'],
}