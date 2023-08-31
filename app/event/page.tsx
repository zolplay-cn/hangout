import { redirect } from 'next/navigation'
import { latestEvent } from '../events'

export default function Index() {
  redirect('/event/' + latestEvent.id)
}
