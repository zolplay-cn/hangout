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

  if (!getEvent(eventId)?.[checkWith]) {
    console.debug(
      `event ${eventId} 的 ${checkWith} 校验未通过，请检查events配置 \n即将重定向到首页`
    )
    return redirect('/')
  }

  return children
}
