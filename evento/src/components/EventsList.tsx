import { EventoEvent } from '@/lib/types'
import EventCard from './event-card'

type EventsListProps = {
  events: EventoEvent[]
}

export default function EventsList({ events }: EventsListProps) {
  return (
    <section className="flex max-w-[1100px] flex-wrap justify-center gap-10 px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  )
}
