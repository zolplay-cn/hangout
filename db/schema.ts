import { boolean, pgTable, serial, varchar } from 'drizzle-orm/pg-core'

export const guests = pgTable('guests', {
  id: serial('id').primaryKey(),
  event: varchar('event').notNull(),
  name: varchar('name').notNull(),
  job: varchar('job').notNull(),
  wechat: varchar('wechat').notNull(),
  social: varchar('social').default(''),
  code: varchar('code'),
  inGiveawayPool: boolean('in_giveaway_pool').notNull().default(true),
  checkedIn: boolean('checked_in').notNull().default(false),
})
