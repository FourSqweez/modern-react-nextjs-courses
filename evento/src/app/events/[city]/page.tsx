import EventsList from '@/components/EventsList'
import H1 from '@/components/H1'
import { capitalize } from '@/lib/utils'
import { Metadata } from 'next'
import { Suspense } from 'react'
import LoadingCard from '../../../components/LoadingCard'

type Props = {
  params: {
    city: string
  }
}

type EventsPageProps = Props & {
  searchParams: { [key: string]: string | string[] | undefined }
}

export function generateMetadata({ params }: Props): Metadata {
  const { city } = params

  return {
    title: city === 'all' ? 'All Events' : `Events in ${capitalize(city)}`,
  }
}

export default async function EventsPage({
  params,
  searchParams,
}: EventsPageProps) {
  const city = params.city
  const page = searchParams.page || 1

  return (
    <main className="flex min-h-[110vh] flex-col items-center px-[20px] py-24">
      <H1 className="mb-28">
        {city === 'all' && 'All Events'}
        {city !== 'all' && `Events in ${capitalize(city)}`}
      </H1>

      <Suspense fallback={<LoadingCard />}>
        <EventsList city={city} page={+page} />
      </Suspense>
    </main>
  )
}
