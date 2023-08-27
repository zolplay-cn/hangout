import { db } from '@/db'
import { guests } from '@/db/schema'
import { and, eq, notInArray } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { pickedCodes } = await req.json()
  const winnableGuests = await db
    .select()
    .from(guests)
    .where(
      pickedCodes.length > 0
        ? and(
            notInArray(guests.code, pickedCodes),
            eq(guests.inGiveawayPool, true),
            eq(guests.checkedIn, true),
          )
        : and(eq(guests.inGiveawayPool, true), eq(guests.checkedIn, true)),
    )

  const winner =
    winnableGuests[Math.floor(Math.random() * winnableGuests.length)]

  return NextResponse.json({
    winner,
  })
}
