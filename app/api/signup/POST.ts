import { getEvent } from '@/app/event/events'
import { db } from '@/db'
import { guests } from '@/db/schema'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const { nickname, job, wechat, social, event } = await req.json()

  if (!getEvent(event)?.allowSignUp) {
    return NextResponse.json(
      { message: 'Signup is not ready yet.' },
      { status: 403 }
    )
  }

  const user = await db
    .insert(guests)
    .values({
      event,
      name: nickname,
      job,
      wechat,
      social,
    })
    .returning({ id: guests.id })

  return NextResponse.json(user)
}
