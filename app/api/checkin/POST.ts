import { db } from '@/db'
import { guests } from '@/db/schema'

import { and, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { getEvent } from '@/app/events'

export const POST = async (req: NextRequest) => {
  const { code, event } = await req.json()
  if (!getEvent(event)?.allowCheckIn) {
    return NextResponse.json(
      { message: 'Check-in is not open yet.' },
      { status: 403 }
    )
  }

  const users = await db
    .update(guests)
    .set({ checkedIn: true })
    .where(eq(guests.event, event))
    .where(eq(guests.invite, true))
    .where(eq(guests.code, code))
    .returning({ name: guests.name })

  if (!users.length) {
    return NextResponse.json(
      { message: `Code [${code}] does not exist.` },
      { status: 404 }
    )
  }

  const checkedInUsers = await db
    .select()
    .from(guests)
    .where(eq(guests.event, event))
    .where(eq(guests.invite, true))
    .where(eq(guests.checkedIn, true))

  return NextResponse.json({
    user: users[0].name,
    order: checkedInUsers.length + 1,
  })
}
