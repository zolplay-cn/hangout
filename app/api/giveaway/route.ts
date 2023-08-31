import { db } from '@/db'
import { guests } from '@/db/schema'
import { and, eq, notInArray } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { hasPassedPredefinedDateTime } from '@/app/api/guard'

export async function POST(req: NextRequest) {
  if (!hasPassedPredefinedDateTime('2023-09-02 14:00')) {
    return NextResponse.json(
      { message: 'Giveaway is not live yet.' },
      { status: 403 }
    )
  }

  const { pickedCodes, event } = await req.json()
  const winnableGuests = await db
    .select()
    .from(guests)
    .where(
      pickedCodes.length > 0
        ? and(
            notInArray(guests.code, pickedCodes),
            eq(guests.inGiveawayPool, true),
            eq(guests.checkedIn, true),
            eq(guests.event, event)
          )
        : and(
            eq(guests.inGiveawayPool, true),
            eq(guests.checkedIn, true),
            eq(guests.event, event)
          )
    )

  const winner =
    winnableGuests[Math.floor(Math.random() * winnableGuests.length)]

  return NextResponse.json({
    winner,
  })
}
