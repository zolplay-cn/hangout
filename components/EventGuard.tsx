import { FC, ReactNode } from 'react'
import { getEvent } from '../app/event/events'
import { redirect } from 'next/navigation'

export const EventGuard: FC<{
  children: ReactNode
  eventId: string | undefined
  // {} 过滤 返回值是null的情况
  checkWith: keyof (ReturnType<typeof getEvent> & {})
}> = ({ children, eventId, checkWith }) => {
  if (!eventId) return redirect('/')

  if (!getEvent(eventId)?.[checkWith]) return redirect('/')

  return children
}
