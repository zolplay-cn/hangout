import { useMemo } from 'react'
import { hasPassedPredefinedDateTime } from '../../lib/guard'

type Event = {
  id: string
  signUpStartAt: string
  signUpEndAt: string
  checkInStartAt: string
  giveAwayStartAt: string
  endAt: string
}

const EVENTS: Event[] = [
  {
    id: '1',
    signUpStartAt: '2023-08-03 14:00',
    signUpEndAt: '2023-08-31 14:00',
    checkInStartAt: '2023-09-03 11:00',
    giveAwayStartAt: '2023-09-03 14:00',
    endAt: '2023-09-03 18:00',
  },
  {
    id: '2',
    signUpStartAt: '2023-09-01 09:00',
    signUpEndAt: '2023-09-07 14:00',
    checkInStartAt: '2023-09-10 11:00',
    giveAwayStartAt: '2023-09-10 14:00',
    endAt: '2023-09-10 18:00',
  },
]

export const getEvent = (id: string) => {
  const event = EVENTS.find((event) => event.id === id)
  if (!event) return null

  const isSignupStart = hasPassedPredefinedDateTime(event.signUpStartAt)
  const isSignupEnd = hasPassedPredefinedDateTime(event.signUpEndAt)
  const isCheckInStart = hasPassedPredefinedDateTime(event.checkInStartAt)
  const isGiveawayStart = hasPassedPredefinedDateTime(event.giveAwayStartAt)
  const isEnded = hasPassedPredefinedDateTime(event.endAt)

  return {
    ...event,
    isSignupStart,
    isSignupEnd,
    isCheckInStart,
    isGiveawayStart,
    isEnded,
    allowSignUp: !isEnded && isSignupStart && !isSignupEnd,
    allowCheckIn: !isEnded && isCheckInStart,
    allowGiveaway: !isEnded && isGiveawayStart,
  }
}

export const useEvent = (id: string) => {
  return useMemo(() => getEvent(id), [])
}

export const latestEvent = EVENTS[EVENTS.length - 1]
