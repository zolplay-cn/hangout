import { redirect } from 'next/navigation'
import { latestEvent } from './event/events'

export default function Index() {
  redirect('/event/' + latestEvent.id)
}
