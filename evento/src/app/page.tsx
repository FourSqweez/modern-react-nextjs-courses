import SearchForm from '@/components/SearchForm'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center px-3 pt-36">
      <h1 className="text-3xl font-bold tracking-tight lg:text-6xl">
        Find events around you
      </h1>
      <p className="mb-12 mt-7 text-2xl opacity-75 lg:text-3xl">
        Browse more than{' '}
        <span className="text-accent font-bold italic underline">
          10,000 events
        </span>{' '}
        around you
      </p>

      <SearchForm />

      <section className="mt-4 flex gap-x-4 text-sm text-white/50">
        <p>Popular:</p>
        <div className="space-x-2 font-semibold">
          <Link href="/events/austin">Austin</Link>
          <Link href="/events/seattle">Seattle</Link>
        </div>
      </section>
    </main>
  )
}
