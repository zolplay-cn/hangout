import { db } from '@/db'
import { guests } from '@/db/schema'
import { and, eq, notInArray } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { getEvent } from '@/app/events'

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
    .where(eq(guests.event, event))
    .where(eq(guests.invite, true))
    .where(
      pickedCodes.length > 0
        ? and(
            notInArray(guests.code, pickedCodes),
            eq(guests.inGiveawayPool, true),
            eq(guests.checkedIn, true)
          )
        : and(eq(guests.inGiveawayPool, true), eq(guests.checkedIn, true))
    )

  const winner =
    winnableGuests[Math.floor(Math.random() * winnableGuests.length)]

  return NextResponse.json({
    winner,
  })
}
