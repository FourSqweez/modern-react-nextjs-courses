import { getEvents } from '@/lib/server-utils'
import { capitalize } from '@/lib/utils'
import EventCard from './event-card'
import NoEvent from './NoEvent'
import PaginationControls from './PaginationControls'

type EventsListProps = {
  city: string
  page?: number
}

export default async function EventsList({ city, page = 1 }: EventsListProps) {
  const { events, totalCount } = await getEvents(city, page)

  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : ''
  const nextPath =
    totalCount > 6 * page ? `/events/${city}?page=${page + 1}` : ''

  if(!events.length) {
    return <NoEvent city={capitalize(city)}/>
  }

  return (
    <section className="flex max-w-[1100px] flex-wrap justify-center gap-10 px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

      <PaginationControls nextPath={nextPath} previousPath={previousPath} />
    </section>
  )
}
