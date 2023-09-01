import { db } from '@/db'
import { guests } from '@/db/schema'
import { and, eq, notInArray } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { getEvent } from '@/app/event/events'

export async function POST(req: NextRequest) {
  const { pickedCodes, event } = await req.json()

  if (!getEvent(event)?.allowGiveaway) {
    return NextResponse.json(
      { message: 'Giveaway is not live yet.' },
      { status: 403 }
    )
  }

  const winnableGuests = await db
    .select()
    .from(guests)
    .where(
      and(
        eq(guests.event, event),
        eq(guests.invite, true),
        eq(guests.inGiveawayPool, true),
        eq(guests.checkedIn, true),
        pickedCodes.length > 0
          ? notInArray(guests.code, pickedCodes)
          : undefined
      )
    )

  const winner =
    winnableGuests[Math.floor(Math.random() * winnableGuests.length)]

  return NextResponse.json({
    winner,
  })
}
