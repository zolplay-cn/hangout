import { db } from '@/db'
import { guests } from '@/db/schema'
import { and, eq, isNotNull, notInArray } from 'drizzle-orm'
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
        eq(guests.inGiveawayPool, true),
        eq(guests.checkedIn, true),
        eq(guests.winner, false),
        isNotNull(guests.code),
        pickedCodes.length > 0
          ? notInArray(guests.code, pickedCodes)
          : undefined
      )
    )

  if (winnableGuests.length <= 0) {
    return NextResponse.json(
      { message: '对不起, 本轮抽奖完毕🤡' },
      { status: 403 }
    )
  }

  const winner =
    winnableGuests[Math.floor(Math.random() * winnableGuests.length)]

  await db
    .update(guests)
    .set({ winner: true })
    .where(and(eq(guests.id, winner.id)))

  return NextResponse.json({
    winner,
  })
}
