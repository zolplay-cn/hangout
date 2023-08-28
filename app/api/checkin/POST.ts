import { db } from '@/db'
import { guests } from '@/db/schema'

import { and, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const { code } = await req.json()
  const users = await db
    .update(guests)
    .set({ checkedIn: true })
    .where(and(eq(guests.code, code)))
    .returning({ name: guests.name })

  if (!users.length) {
    return NextResponse.json(
      { message: `code ${code} does not exist` },
      { status: 404 }
    )
  }
  const checkedInUsers = await db
    .select()
    .from(guests)
    .where(and(eq(guests.checkedIn, true)))

  return NextResponse.json({
    user: users[0].name,
    order: checkedInUsers.length + 1,
  })
}
