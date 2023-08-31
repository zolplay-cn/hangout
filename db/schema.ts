import { boolean, pgTable, serial, varchar } from 'drizzle-orm/pg-core'

export const guests = pgTable('guests', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  code: varchar('code'),
  inGiveawayPool: boolean('in_giveaway_pool').notNull().default(true),
  checkedIn: boolean('checked_in').notNull().default(false),
  event: varchar('event').notNull(),
})
