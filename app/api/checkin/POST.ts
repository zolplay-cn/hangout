import { db } from '@/db'
import { guests } from '@/db/schema'

import { and, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { hasPassedPredefinedDateTime } from '@/app/api/guard'

export const POST = async (req: NextRequest) => {
  if (!hasPassedPredefinedDateTime('2023-09-02 12:00')) {
    return NextResponse.json(
      { message: 'Check-in is not open yet.' },
      { status: 403 }
    )
  }

  const { code, event } = await req.json()
  const users = await db
    .update(guests)
    .set({ checkedIn: true })
    .where(and(eq(guests.code, code), eq(guests.event, event)))
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
    .where(and(eq(guests.checkedIn, true), eq(guests.event, event)))

  return NextResponse.json({
    user: users[0].name,
    order: checkedInUsers.length + 1,
  })
}
