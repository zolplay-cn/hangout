import { redirect } from 'next/navigation'
import { latestEvent } from './event/events'

export default function Index() {
  console.debug(`由首页重定向到${latestEvent.id}`)
  redirect('/event/' + latestEvent.id)
}
