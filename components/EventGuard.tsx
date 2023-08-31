import { FC } from 'react'
import { getEvent } from '../app/events'
import { redirect } from 'next/navigation'

export const EventGuard: FC<{
  eventId: string | undefined
  // {} 过滤 返回值是null的情况
  checkWith: keyof (ReturnType<typeof getEvent> & {})
}> = ({ eventId, checkWith }) => {
  if (!eventId) return redirect('/')

  if (!getEvent(eventId)?.[checkWith]) return redirect('/')

  return null
}
