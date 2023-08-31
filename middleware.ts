import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(2, '60 s'),
})

export const config = {
  matcher: '/api/signup',
}

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const ip = request.ip ?? '127.0.0.1'
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(
    ip
  )

  return success
    ? NextResponse.next()
    : // 🤡并不能真的重定向过去
      NextResponse.redirect(new URL('https://www.miit.gov.cn/', request.url))
}
