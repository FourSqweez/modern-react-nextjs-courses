import EventsList from '@/components/EventsList'
import H1 from '@/components/H1'
import { EventoEvent } from '@/lib/types'

type EventsPageProps = {
  params: {
    city: string
  }
}

export default async function EventsPage({ params }: EventsPageProps) {
  const city = params.city

  const response = await fetch(
    'https://bytegrad.com/course-assets/projects/evento/api/events?city=austin',
  )
  const events: EventoEvent[] = await response.json()

  return (
    <main className="flex min-h-[110vh] flex-col items-center px-[20px] py-24">
      <H1 className="mb-28">
        {city === 'all' && 'All Events'}
        {city !== 'all' &&
          `Events in ${city.charAt(0).toUpperCase() + city.slice(1)}`}
      </H1>

      <EventsList events={events} />
    </main>
  )
}
