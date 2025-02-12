import { EventoEvent } from '@/lib/types'
import EventCard from './event-card'

type EventsListProps = {
  city: string
}

export default async function EventsList({ city }: EventsListProps) {
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,
  )
  const events: EventoEvent[] = await response.json()

  return (
    <section className="flex max-w-[1100px] flex-wrap justify-center gap-10 px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  )
}
