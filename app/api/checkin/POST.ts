import { db } from '@/db'
import { guests } from '@/db/schema'

import { and, eq, ne } from 'drizzle-orm'
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
    .where(
      and(
        ne(guests.checkedIn, true),
        eq(guests.code, code),
        eq(guests.invite, true),
        eq(guests.event, event)
      )
    )
    .returning({ name: guests.name })

  if (!users.length) {
    return NextResponse.json(
      { message: `Code [${code}] does not exist or already checked-in.` },
      { status: 404 }
    )
  }

  const checkedInUsers = await db
    .select()
    .from(guests)
    .where(
      and(
        eq(guests.event, event),
        eq(guests.invite, true),
        eq(guests.checkedIn, true)
      )
    )

  return NextResponse.json({
    user: users[0].name,
    order: checkedInUsers.length,
  })
}
