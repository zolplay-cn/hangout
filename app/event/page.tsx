import { redirect } from 'next/navigation'
import { latestEvent } from './events'

export default function EventIndexPage() {
  redirect('/event/' + latestEvent.id)
}
